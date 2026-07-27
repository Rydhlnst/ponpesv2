import { asc } from "drizzle-orm"
import { getDb } from "./index"
import * as schema from "./schema"
import * as defaults from "../cms/default-content"
import { siteConfig as staticSiteConfig } from "../content"

type DbClient = NonNullable<ReturnType<typeof getDb>>

// ─── Media resolution helper ─────────────────────────────────────────────────

let mediaCache: Map<string, { url: string; alt: string | null }> | null = null

async function loadMediaMap(db: DbClient) {
  if (mediaCache) return mediaCache
  const rows = await db.select().from(schema.mediaAssets)
  mediaCache = new Map(rows.map((r) => [r.id, { url: r.url, alt: r.alt }]))
  return mediaCache
}

async function resolveMediaUrl(
  db: DbClient,
  mediaId: string | null | undefined
): Promise<string | null> {
  if (!mediaId) return null
  const map = await loadMediaMap(db)
  return map.get(mediaId)?.url ?? null
}

export function resetMediaCache() {
  mediaCache = null
}

// ─── Static fallback for site settings ──────────────────────────────────────

const staticSiteSettings = {
  ...staticSiteConfig,
  description: defaults.defaultSiteSettings.description,
  metadataTitle: defaults.defaultSiteSettings.metadataTitle,
  metadataDescription: defaults.defaultSiteSettings.metadataDescription,
}

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  const db = getDb()
  if (!db) return staticSiteSettings

  const [row] = await db.select().from(schema.siteSettings).limit(1)
  if (!row) return staticSiteSettings

  const logo =
    (await resolveMediaUrl(db, row.logoMediaId)) || staticSiteConfig.logo

  return {
    name: row.name,
    shortName: row.shortName,
    tagline: row.tagline,
    description: row.description,
    whatsapp: row.whatsapp,
    whatsappLabel: row.whatsappLabel,
    brochureHref: row.brochureHref,
    mapHref: row.mapHref,
    logo,
    address: row.address,
    email: row.email,
    officeHours: row.officeHours,
    metadataTitle: row.metadataTitle,
    metadataDescription: row.metadataDescription,
    location: staticSiteConfig.location,
  }
}

export async function getNavigation() {
  const db = getDb()
  if (!db) return defaults.defaultNavigation

  const rows = await db
    .select()
    .from(schema.navigationItems)
    .orderBy(asc(schema.navigationItems.sortOrder))
  if (rows.length === 0) return defaults.defaultNavigation

  return rows.map((r) => ({ label: r.label, href: r.href }))
}

export async function getHomepageSections() {
  const db = getDb()
  if (!db) {
    return {
      ...defaults.defaultHomepage,
      heroImageUrl: defaults.defaultHomepage.heroImagePath,
      faqImageUrl: defaults.defaultHomepage.faqImagePath,
      heroStats: defaults.defaultHomepage.heroStats,
    }
  }

  const [row] = await db.select().from(schema.homepageSections).limit(1)
  if (!row) {
    return {
      ...defaults.defaultHomepage,
      heroImageUrl: defaults.defaultHomepage.heroImagePath,
      faqImageUrl: defaults.defaultHomepage.faqImagePath,
      heroStats: defaults.defaultHomepage.heroStats,
    }
  }

  const heroImageUrl =
    (await resolveMediaUrl(db, row.heroImageMediaId)) ||
    defaults.defaultHomepage.heroImagePath
  const faqImageUrl =
    (await resolveMediaUrl(db, row.faqImageMediaId)) ||
    defaults.defaultHomepage.faqImagePath

  const heroStatsRows = await db
    .select()
    .from(schema.heroStats)
    .orderBy(asc(schema.heroStats.sortOrder))
  const heroStats =
    heroStatsRows.length > 0
      ? heroStatsRows.map((r) => ({ value: r.value, label: r.label }))
      : defaults.defaultHomepage.heroStats

  return {
    heroBadge: row.heroBadge,
    heroTitle: row.heroTitle,
    heroDescription: row.heroDescription,
    heroImageUrl,
    primaryCtaLabel: row.primaryCtaLabel,
    primaryCtaHref: row.primaryCtaHref,
    secondaryCtaLabel: row.secondaryCtaLabel,
    secondaryCtaHref: row.secondaryCtaHref,
    newsTitle: row.newsTitle,
    newsDescription: row.newsDescription,
    partnersTitle: row.partnersTitle,
    partnersDescription: row.partnersDescription,
    historyTitle: row.historyTitle,
    historyDescription: row.historyDescription,
    whyUsTitle: row.whyUsTitle,
    whyUsDescription: row.whyUsDescription,
    educationTitle: row.educationTitle,
    educationDescription: row.educationDescription,
    facilitiesTitle: row.facilitiesTitle,
    facilitiesDescription: row.facilitiesDescription,
    faqTitle: row.faqTitle,
    faqDescription: row.faqDescription,
    faqImageUrl,
    testimonialsTitle: row.testimonialsTitle,
    testimonialsDescription: row.testimonialsDescription,
    bottomCtaTitle: row.bottomCtaTitle,
    bottomCtaDescription: row.bottomCtaDescription,
    bottomCtaLabel: row.bottomCtaLabel,
    bottomCtaHref: row.bottomCtaHref,
    heroStats,
  }
}

export async function getWhyUsItems() {
  const db = getDb()
  if (!db) return defaults.defaultWhyUsItems

  const rows = await db
    .select()
    .from(schema.whyUsItems)
    .orderBy(asc(schema.whyUsItems.sortOrder))
  if (rows.length === 0) return defaults.defaultWhyUsItems

  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    iconKey: r.iconKey,
  }))
}

export async function getNewsItems() {
  const db = getDb()
  if (!db) {
    return defaults.defaultNewsItems.map((item) => ({ ...item, cover: item.coverPath }))
  }

  const rows = await db
    .select()
    .from(schema.newsItems)
    .orderBy(asc(schema.newsItems.sortOrder))
  if (rows.length === 0) {
    return defaults.defaultNewsItems.map((item) => ({ ...item, cover: item.coverPath }))
  }

  return Promise.all(
    rows.map(async (r) => ({
      title: r.title,
      dateLabel: r.dateLabel,
      category: r.category,
      summary: r.summary,
      href: r.href,
      cover: (await resolveMediaUrl(db, r.coverMediaId)) || null,
      published: r.published,
      sortOrder: r.sortOrder,
    }))
  )
}

export async function getPartnerItems() {
  const db = getDb()
  if (!db) {
    return defaults.defaultPartnerItems.map((item) => ({
      ...item,
      logo: staticSiteConfig.heroImage,
    }))
  }

  const rows = await db
    .select()
    .from(schema.partnerItems)
    .orderBy(asc(schema.partnerItems.sortOrder))
  if (rows.length === 0) {
    return defaults.defaultPartnerItems.map((item) => ({
      ...item,
      logo: staticSiteConfig.heroImage,
    }))
  }

  return Promise.all(
    rows.map(async (r) => ({
      name: r.name,
      note: r.note,
      logo: (await resolveMediaUrl(db, r.logoMediaId)) || staticSiteConfig.heroImage,
      href: r.href,
    }))
  )
}

export async function getHistoryTimeline() {
  const db = getDb()
  if (!db) return defaults.defaultHistoryTimeline

  const rows = await db
    .select()
    .from(schema.historyTimelineItems)
    .orderBy(asc(schema.historyTimelineItems.sortOrder))
  if (rows.length === 0) return defaults.defaultHistoryTimeline

  return rows.map((r) => ({
    year: r.year,
    title: r.title,
    description: r.description,
    color: r.color,
  }))
}

export async function getEducationSection() {
  const db = getDb()
  if (!db) {
    return {
      pageTitle: defaults.defaultEducationSection.pageTitle,
      pageDescription: defaults.defaultEducationSection.pageDescription,
      highlights: defaults.defaultEducationSection.highlights,
      programs: defaults.defaultEducationSection.programs,
    }
  }

  const [profileRow] = await db
    .select()
    .from(schema.educationHighlights)
    .limit(1)

  const highlightRows = await db
    .select()
    .from(schema.educationHighlights)
    .orderBy(asc(schema.educationHighlights.sortOrder))

  const programRows = await db
    .select()
    .from(schema.educationPrograms)
    .orderBy(asc(schema.educationPrograms.sortOrder))

  const allPoints = await db
    .select()
    .from(schema.educationProgramPoints)
    .orderBy(asc(schema.educationProgramPoints.sortOrder))

  const pointsByProgram = new Map<string, typeof allPoints>()
  for (const p of allPoints) {
    const list = pointsByProgram.get(p.programId) || []
    list.push(p)
    pointsByProgram.set(p.programId, list)
  }

  if (highlightRows.length === 0 && programRows.length === 0) {
    return {
      pageTitle: defaults.defaultEducationSection.pageTitle,
      pageDescription: defaults.defaultEducationSection.pageDescription,
      highlights: defaults.defaultEducationSection.highlights,
      programs: defaults.defaultEducationSection.programs,
    }
  }

  // Use homepage singleton for page title/description if available
  const db2 = getDb()!
  const [homeRow] = await db2.select().from(schema.homepageSections).limit(1)

  const highlights = highlightRows.map((r) => ({ body: r.body, sortOrder: r.sortOrder }))

  const programs = await Promise.all(
    programRows.map(async (r) => {
      const points = (pointsByProgram.get(r.id) || []).map((p) => ({
        body: p.body,
        sortOrder: p.sortOrder,
      }))
      const imagePath =
        (await resolveMediaUrl(db, r.imageMediaId)) ||
        defaults.defaultEducationSection.programs[0]?.imagePath ||
        "/gallery/gallery-01.jpeg"

      return {
        name: r.name,
        summary: r.summary,
        focus: r.focus,
        imagePath,
        iconKey: r.iconKey,
        homePrimaryLabel: r.homePrimaryLabel,
        homePrimaryHref: r.homePrimaryHref,
        homeSecondaryLabel: r.homeSecondaryLabel,
        homeSecondaryHref: r.homeSecondaryHref,
        sortOrder: r.sortOrder,
        points,
      }
    })
  )

  return {
    pageTitle: homeRow?.educationTitle || defaults.defaultEducationSection.pageTitle,
    pageDescription:
      homeRow?.educationDescription ||
      defaults.defaultEducationSection.pageDescription,
    highlights,
    programs,
  }
}

export async function getFacilitiesSection() {
  const db = getDb()
  if (!db) {
    return {
      pageTitle: defaults.defaultFacilitiesSection.pageTitle,
      pageDescription: defaults.defaultFacilitiesSection.pageDescription,
      highlights: defaults.defaultFacilitiesSection.highlights,
      items: defaults.defaultFacilitiesSection.items,
    }
  }

  const highlightRows = await db
    .select()
    .from(schema.facilityHighlights)
    .orderBy(asc(schema.facilityHighlights.sortOrder))

  const itemRows = await db
    .select()
    .from(schema.facilities)
    .orderBy(asc(schema.facilities.sortOrder))

  if (highlightRows.length === 0 && itemRows.length === 0) {
    return {
      pageTitle: defaults.defaultFacilitiesSection.pageTitle,
      pageDescription: defaults.defaultFacilitiesSection.pageDescription,
      highlights: defaults.defaultFacilitiesSection.highlights,
      items: defaults.defaultFacilitiesSection.items,
    }
  }

  const [homeRow] = await db.select().from(schema.homepageSections).limit(1)

  const highlights = highlightRows.map((r) => ({ body: r.body, sortOrder: r.sortOrder }))

  const items = await Promise.all(
    itemRows.map(async (r) => ({
      name: r.name,
      description: r.description,
      imagePath:
        (await resolveMediaUrl(db, r.imageMediaId)) ||
        defaults.defaultFacilitiesSection.items[0]?.imagePath ||
        "/gallery/gallery-01.jpeg",
      iconKey: r.iconKey,
      sortOrder: r.sortOrder,
    }))
  )

  return {
    pageTitle: homeRow?.facilitiesTitle || defaults.defaultFacilitiesSection.pageTitle,
    pageDescription:
      homeRow?.facilitiesDescription ||
      defaults.defaultFacilitiesSection.pageDescription,
    highlights,
    items,
  }
}

export async function getGallerySection() {
  const db = getDb()
  if (!db) {
    return defaults.defaultGallerySection.items.map((item) => ({
      ...item,
      image: item.imagePath,
    }))
  }

  const rows = await db
    .select()
    .from(schema.galleryItems)
    .orderBy(asc(schema.galleryItems.sortOrder))
  if (rows.length === 0) {
    return defaults.defaultGallerySection.items.map((item) => ({
      ...item,
      image: item.imagePath,
    }))
  }

  return Promise.all(
    rows.map(async (r) => ({
      image: (await resolveMediaUrl(db, r.imageMediaId)) || null,
      alt: r.alt,
      caption: r.caption,
      aspect: r.aspect,
      published: r.published,
      sortOrder: r.sortOrder,
    }))
  )
}

export async function getFaqSection() {
  const db = getDb()
  if (!db) return defaults.defaultFaqSection.categories

  const categoryRows = await db
    .select()
    .from(schema.faqCategories)
    .orderBy(asc(schema.faqCategories.sortOrder))

  if (categoryRows.length === 0) return defaults.defaultFaqSection.categories

  const itemRows = await db
    .select()
    .from(schema.faqItems)
    .orderBy(asc(schema.faqItems.sortOrder))

  const itemsByCategory = new Map<string, typeof itemRows>()
  for (const item of itemRows) {
    const list = itemsByCategory.get(item.categoryId) || []
    list.push(item)
    itemsByCategory.set(item.categoryId, list)
  }

  return categoryRows.map((cat) => ({
    name: cat.name,
    iconKey: cat.iconKey,
    sortOrder: cat.sortOrder,
    items: (itemsByCategory.get(cat.id) || []).map((item) => ({
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
    })),
  }))
}

export async function getTestimonials() {
  const db = getDb()
  if (!db) {
    return defaults.defaultTestimonialsSection.items.map((item) => ({
      ...item,
      avatar: item.avatarPath,
    }))
  }

  const rows = await db
    .select()
    .from(schema.testimonials)
    .orderBy(asc(schema.testimonials.sortOrder))
  if (rows.length === 0) {
    return defaults.defaultTestimonialsSection.items.map((item) => ({
      ...item,
      avatar: item.avatarPath,
    }))
  }

  return Promise.all(
    rows.map(async (r) => ({
      name: r.name,
      role: r.role,
      quote: r.quote,
      avatar: (await resolveMediaUrl(db, r.avatarMediaId)) || null,
      published: r.published,
      sortOrder: r.sortOrder,
    }))
  )
}

export async function getProfileSection() {
  const db = getDb()
  if (!db) {
    return {
      pageTitle: defaults.defaultProfileSection.pageTitle,
      pageDescription: defaults.defaultProfileSection.pageDescription,
      vision: defaults.defaultProfileSection.vision,
      identityRows: defaults.defaultProfileSection.identityRows,
      missionItems: defaults.defaultProfileSection.missionItems,
      goalItems: defaults.defaultProfileSection.goalItems,
      orgRows: defaults.defaultProfileSection.orgRows,
      programRows: defaults.defaultProfileSection.programRows,
    }
  }

  const [page] = await db.select().from(schema.profilePage).limit(1)

  const identityRows = await db
    .select()
    .from(schema.profileIdentityRows)
    .orderBy(asc(schema.profileIdentityRows.sortOrder))

  const missionItems = await db
    .select()
    .from(schema.profileMissionItems)
    .orderBy(asc(schema.profileMissionItems.sortOrder))

  const goalItems = await db
    .select()
    .from(schema.profileGoalItems)
    .orderBy(asc(schema.profileGoalItems.sortOrder))

  const orgRows = await db
    .select()
    .from(schema.profileOrgRows)
    .orderBy(asc(schema.profileOrgRows.sortOrder))

  const programRows = await db
    .select()
    .from(schema.profileProgramRows)
    .orderBy(asc(schema.profileProgramRows.sortOrder))

  if (
    !page &&
    identityRows.length === 0 &&
    missionItems.length === 0
  ) {
    return {
      pageTitle: defaults.defaultProfileSection.pageTitle,
      pageDescription: defaults.defaultProfileSection.pageDescription,
      vision: defaults.defaultProfileSection.vision,
      identityRows: defaults.defaultProfileSection.identityRows,
      missionItems: defaults.defaultProfileSection.missionItems,
      goalItems: defaults.defaultProfileSection.goalItems,
      orgRows: defaults.defaultProfileSection.orgRows,
      programRows: defaults.defaultProfileSection.programRows,
    }
  }

  return {
    pageTitle: page?.pageTitle || defaults.defaultProfileSection.pageTitle,
    pageDescription:
      page?.pageDescription || defaults.defaultProfileSection.pageDescription,
    vision: page?.vision || defaults.defaultProfileSection.vision,
    identityRows:
      identityRows.length > 0
        ? identityRows.map((r) => ({ label: r.label, value: r.value, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.identityRows,
    missionItems:
      missionItems.length > 0
        ? missionItems.map((r) => ({ body: r.body, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.missionItems,
    goalItems:
      goalItems.length > 0
        ? goalItems.map((r) => ({ body: r.body, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.goalItems,
    orgRows:
      orgRows.length > 0
        ? orgRows.map((r) => ({ role: r.role, name: r.name, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.orgRows,
    programRows:
      programRows.length > 0
        ? programRows.map((r) => ({ name: r.name, iconKey: r.iconKey, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.programRows,
  }
}

export async function getContactSection() {
  const db = getDb()
  if (!db) {
    return {
      pageTitle: defaults.defaultContactSection.pageTitle,
      pageDescription: defaults.defaultContactSection.pageDescription,
      infoTitle: defaults.defaultContactSection.infoTitle,
      infoDescription: defaults.defaultContactSection.infoDescription,
      locationTitle: defaults.defaultContactSection.locationTitle,
      locationDescription: defaults.defaultContactSection.locationDescription,
      methods: defaults.defaultContactSection.methods,
      locations: defaults.defaultContactSection.locations,
    }
  }

  const [page] = await db.select().from(schema.contactPage).limit(1)

  const methods = await db
    .select()
    .from(schema.contactMethods)
    .orderBy(asc(schema.contactMethods.sortOrder))

  const locations = await db
    .select()
    .from(schema.contactLocations)
    .orderBy(asc(schema.contactLocations.sortOrder))

  if (!page && methods.length === 0 && locations.length === 0) {
    return {
      pageTitle: defaults.defaultContactSection.pageTitle,
      pageDescription: defaults.defaultContactSection.pageDescription,
      infoTitle: defaults.defaultContactSection.infoTitle,
      infoDescription: defaults.defaultContactSection.infoDescription,
      locationTitle: defaults.defaultContactSection.locationTitle,
      locationDescription: defaults.defaultContactSection.locationDescription,
      methods: defaults.defaultContactSection.methods,
      locations: defaults.defaultContactSection.locations,
    }
  }

  return {
    pageTitle: page?.pageTitle || defaults.defaultContactSection.pageTitle,
    pageDescription:
      page?.pageDescription || defaults.defaultContactSection.pageDescription,
    infoTitle: page?.infoTitle || defaults.defaultContactSection.infoTitle,
    infoDescription:
      page?.infoDescription || defaults.defaultContactSection.infoDescription,
    locationTitle:
      page?.locationTitle || defaults.defaultContactSection.locationTitle,
    locationDescription:
      page?.locationDescription ||
      defaults.defaultContactSection.locationDescription,
    methods:
      methods.length > 0
        ? methods.map((r) => ({
            type: r.type,
            title: r.title,
            subtitle: r.subtitle,
            description: r.description,
            value: r.value,
            actionLabel: r.actionLabel,
            actionHref: r.actionHref,
            sortOrder: r.sortOrder,
          }))
        : defaults.defaultContactSection.methods,
    locations:
      locations.length > 0
        ? locations.map((r) => ({
            title: r.title,
            subtitle: r.subtitle,
            address: r.address,
            mapEmbedUrl: r.mapEmbedUrl,
            mapHref: r.mapHref,
            sortOrder: r.sortOrder,
          }))
        : defaults.defaultContactSection.locations,
  }
}

export async function getFooterSection() {
  const db = getDb()
  if (!db) {
    return {
      brandText: defaults.defaultFooterSection.brandText,
      socialIntro: defaults.defaultFooterSection.socialIntro,
      copyrightText: defaults.defaultFooterSection.copyrightText,
      quickLinks: defaults.defaultFooterSection.quickLinks,
      socialLinks: defaults.defaultFooterSection.socialLinks,
    }
  }

  const [row] = await db.select().from(schema.footerSettings).limit(1)

  const quickLinks = await db
    .select()
    .from(schema.footerQuickLinks)
    .orderBy(asc(schema.footerQuickLinks.sortOrder))

  const socialLinks = await db
    .select()
    .from(schema.footerSocialLinks)
    .orderBy(asc(schema.footerSocialLinks.sortOrder))

  if (!row && quickLinks.length === 0 && socialLinks.length === 0) {
    return {
      brandText: defaults.defaultFooterSection.brandText,
      socialIntro: defaults.defaultFooterSection.socialIntro,
      copyrightText: defaults.defaultFooterSection.copyrightText,
      quickLinks: defaults.defaultFooterSection.quickLinks,
      socialLinks: defaults.defaultFooterSection.socialLinks,
    }
  }

  return {
    brandText: row?.brandText || defaults.defaultFooterSection.brandText,
    socialIntro: row?.socialIntro || defaults.defaultFooterSection.socialIntro,
    copyrightText:
      row?.copyrightText || defaults.defaultFooterSection.copyrightText,
    quickLinks:
      quickLinks.length > 0
        ? quickLinks.map((r) => ({ label: r.label, href: r.href, sortOrder: r.sortOrder }))
        : defaults.defaultFooterSection.quickLinks,
    socialLinks:
      socialLinks.length > 0
        ? socialLinks.map((r) => ({ platform: r.platform, href: r.href, sortOrder: r.sortOrder }))
        : defaults.defaultFooterSection.socialLinks,
  }
}
