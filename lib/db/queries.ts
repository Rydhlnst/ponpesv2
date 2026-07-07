import { eq, asc } from "drizzle-orm"
import { getDb } from "./index"

type DbClient = NonNullable<ReturnType<typeof getDb>>
import * as schema from "./schema"
import * as defaults from "../cms/default-content"
import { siteConfig as staticSiteConfig } from "../content"

const staticSiteSettings = {
  ...staticSiteConfig,
  description: defaults.defaultSiteSettings.description,
  metadataTitle: defaults.defaultSiteSettings.metadataTitle,
  metadataDescription: defaults.defaultSiteSettings.metadataDescription,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resolveMediaUrl(db: DbClient, mediaId: string | null | undefined): Promise<string | null> {
  return null
}

export async function getSiteSettings() {
  return staticSiteSettings
}

export async function getNavigation() {
  return defaults.defaultNavigation
}

export async function getHomepageSections() {
  return {
    ...defaults.defaultHomepage,
    heroImageUrl: defaults.defaultHomepage.heroImagePath,
    faqImageUrl: defaults.defaultHomepage.faqImagePath,
    heroStats: defaults.defaultHomepage.heroStats,
  }
}

export async function getWhyUsItems() {
  return defaults.defaultWhyUsItems
}

export async function getNewsItems() {
  return defaults.defaultNewsItems.map(item => ({
    ...item,
    cover: item.coverPath,
  }))
}

export async function getPartnerItems() {
  return defaults.defaultPartnerItems.map(item => ({
    ...item,
    logo: staticSiteConfig.heroImage,
  }))
}

export async function getHistoryTimeline() {
  return defaults.defaultHistoryTimeline
}

export async function getEducationSection() {
  return {
    pageTitle: defaults.defaultEducationSection.pageTitle,
    pageDescription: defaults.defaultEducationSection.pageDescription,
    highlights: defaults.defaultEducationSection.highlights,
    programs: defaults.defaultEducationSection.programs,
  }
}

export async function getFacilitiesSection() {
  return {
    pageTitle: defaults.defaultFacilitiesSection.pageTitle,
    pageDescription: defaults.defaultFacilitiesSection.pageDescription,
    highlights: defaults.defaultFacilitiesSection.highlights,
    items: defaults.defaultFacilitiesSection.items,
  }
}

export async function getGallerySection() {
  return defaults.defaultGallerySection.items.map(item => ({
    ...item,
    image: item.imagePath,
  }))
}

export async function getFaqSection() {
  return defaults.defaultFaqSection.categories
}

export async function getTestimonials() {
  return defaults.defaultTestimonialsSection.items.map(item => ({
    ...item,
    avatar: item.avatarPath,
  }))
}

export async function getProfileSection() {
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

export async function getContactSection() {
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

export async function getFooterSection() {
  return {
    brandText: defaults.defaultFooterSection.brandText,
    socialIntro: defaults.defaultFooterSection.socialIntro,
    copyrightText: defaults.defaultFooterSection.copyrightText,
    quickLinks: defaults.defaultFooterSection.quickLinks,
    socialLinks: defaults.defaultFooterSection.socialLinks,
  }
}
