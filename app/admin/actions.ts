"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { verifyAdminSession } from "@/lib/auth/admin"
import { getDb, schema } from "@/lib/db"
import { resetMediaCache } from "@/lib/db/queries"
import { richTextParagraph } from "@/lib/cms/rich-text"
import { uploadAsset, deleteAsset } from "@/lib/r2"

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function parseRichText(formData: FormData, key: string) {
  const raw = String(formData.get(key) ?? "").trim()

  if (!raw) {
    return richTextParagraph("")
  }

  try {
    return JSON.parse(raw)
  } catch {
    return richTextParagraph(raw)
  }
}

// -----------------------------------------------------------------------------
// Singleton: Site Settings
// -----------------------------------------------------------------------------
export async function updateSiteSettingsAction(formData: FormData) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) {
    redirect("/admin/site-settings?error=db")
  }

  const values = {
    id: "site",
    name: readString(formData, "name"),
    shortName: readString(formData, "shortName"),
    tagline: readString(formData, "tagline"),
    description: parseRichText(formData, "description"),
    whatsapp: readString(formData, "whatsapp"),
    whatsappLabel: readString(formData, "whatsappLabel"),
    brochureHref: readString(formData, "brochureHref"),
    mapHref: readString(formData, "mapHref"),
    logoMediaId: readString(formData, "logoMediaId") || null,
    address: readString(formData, "address"),
    email: readString(formData, "email"),
    officeHours: readString(formData, "officeHours"),
    metadataTitle: readString(formData, "metadataTitle") || null,
    metadataDescription: readString(formData, "metadataDescription") || null,
    updatedAt: new Date(),
  }

  try {
    await db.insert(schema.siteSettings).values(values).onConflictDoUpdate({
      target: schema.siteSettings.id,
      set: values,
    })
  } catch (err) {
    console.error("Database update failed:", err)
    throw new Error("Gagal menyimpan pengaturan website. Silakan coba lagi.")
  }

  revalidatePath("/", "layout")
  revalidatePath("/admin/site-settings")
  redirect("/admin/site-settings?saved=1")
}

// -----------------------------------------------------------------------------
// Singleton: Homepage Sections
// -----------------------------------------------------------------------------
export async function updateHomepageAction(formData: FormData) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const values = {
    id: "homepage",
    heroBadge: readString(formData, "heroBadge"),
    heroTitle: readString(formData, "heroTitle"),
    heroDescription: parseRichText(formData, "heroDescription"),
    heroImageMediaId: readString(formData, "heroImageMediaId") || null,
    primaryCtaLabel: readString(formData, "primaryCtaLabel"),
    primaryCtaHref: readString(formData, "primaryCtaHref"),
    secondaryCtaLabel: readString(formData, "secondaryCtaLabel"),
    secondaryCtaHref: readString(formData, "secondaryCtaHref"),
    newsTitle: readString(formData, "newsTitle"),
    newsDescription: parseRichText(formData, "newsDescription"),
    partnersTitle: readString(formData, "partnersTitle"),
    partnersDescription: parseRichText(formData, "partnersDescription"),
    historyTitle: readString(formData, "historyTitle"),
    historyDescription: parseRichText(formData, "historyDescription"),
    whyUsTitle: readString(formData, "whyUsTitle"),
    whyUsDescription: parseRichText(formData, "whyUsDescription"),
    educationTitle: readString(formData, "educationTitle"),
    educationDescription: parseRichText(formData, "educationDescription"),
    facilitiesTitle: readString(formData, "facilitiesTitle"),
    facilitiesDescription: parseRichText(formData, "facilitiesDescription"),
    faqTitle: readString(formData, "faqTitle"),
    faqDescription: parseRichText(formData, "faqDescription"),
    faqImageMediaId: readString(formData, "faqImageMediaId") || null,
    testimonialsTitle: readString(formData, "testimonialsTitle"),
    testimonialsDescription: parseRichText(formData, "testimonialsDescription"),
    bottomCtaTitle: readString(formData, "bottomCtaTitle"),
    bottomCtaDescription: parseRichText(formData, "bottomCtaDescription"),
    bottomCtaLabel: readString(formData, "bottomCtaLabel"),
    bottomCtaHref: readString(formData, "bottomCtaHref"),
    updatedAt: new Date(),
  }

  try {
    await db.insert(schema.homepageSections).values(values).onConflictDoUpdate({
      target: schema.homepageSections.id,
      set: values,
    })
  } catch (err) {
    console.error("Database update failed:", err)
    throw new Error("Gagal menyimpan data halaman beranda. Silakan coba lagi.")
  }

  revalidatePath("/", "layout")
}

// -----------------------------------------------------------------------------
// Singleton: Footer Settings
// -----------------------------------------------------------------------------
export async function updateFooterAction(formData: FormData) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const values = {
    id: "footer",
    brandText: parseRichText(formData, "brandText"),
    socialIntro: parseRichText(formData, "socialIntro"),
    copyrightText: readString(formData, "copyrightText"),
    updatedAt: new Date(),
  }

  try {
    await db.insert(schema.footerSettings).values(values).onConflictDoUpdate({
      target: schema.footerSettings.id,
      set: values,
    })
  } catch (err) {
    console.error("Database update failed:", err)
    throw new Error("Gagal menyimpan pengaturan footer. Silakan coba lagi.")
  }

  revalidatePath("/", "layout")
}

// -----------------------------------------------------------------------------
// Singleton: Profile Page
// -----------------------------------------------------------------------------
export async function updateProfilePageAction(formData: FormData) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const values = {
    id: "profile",
    pageTitle: readString(formData, "pageTitle"),
    pageDescription: parseRichText(formData, "pageDescription"),
    vision: parseRichText(formData, "vision"),
    updatedAt: new Date(),
  }

  try {
    await db.insert(schema.profilePage).values(values).onConflictDoUpdate({
      target: schema.profilePage.id,
      set: values,
    })
  } catch (err) {
    console.error("Database update failed:", err)
    throw new Error("Gagal menyimpan data profil. Silakan coba lagi.")
  }

  revalidatePath("/", "layout")
}

// -----------------------------------------------------------------------------
// Singleton: Contact Page
// -----------------------------------------------------------------------------
export async function updateContactPageAction(formData: FormData) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const values = {
    id: "contact",
    pageTitle: readString(formData, "pageTitle"),
    pageDescription: parseRichText(formData, "pageDescription"),
    infoTitle: readString(formData, "infoTitle"),
    infoDescription: parseRichText(formData, "infoDescription"),
    locationTitle: readString(formData, "locationTitle"),
    locationDescription: parseRichText(formData, "locationDescription"),
    updatedAt: new Date(),
  }

  try {
    await db.insert(schema.contactPage).values(values).onConflictDoUpdate({
      target: schema.contactPage.id,
      set: values,
    })
  } catch (err) {
    console.error("Database update failed:", err)
    throw new Error("Gagal menyimpan data kontak. Silakan coba lagi.")
  }

  revalidatePath("/", "layout")
}

// -----------------------------------------------------------------------------
// Media Assets Management
// -----------------------------------------------------------------------------
export async function uploadMediaAction(formData: FormData) {
  await verifyAdminSession()

  const file = formData.get("file") as File | null
  if (!file || file.size === 0) {
    throw new Error("Tidak ada file yang dipilih. Silakan pilih file gambar terlebih dahulu.")
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    throw new Error(`Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 10MB.`)
  }

  if (!file.type.startsWith("image/")) {
    throw new Error(`Format file tidak didukung (${file.type}). Hanya file gambar yang diperbolehkan.`)
  }

  let buffer: Buffer
  try {
    const bytes = await file.arrayBuffer()
    buffer = Buffer.from(bytes)
  } catch {
    throw new Error("Gagal membaca file. Silakan coba lagi dengan file lain.")
  }

  let url: string, storageKey: string
  try {
    const result = await uploadAsset(buffer, file.name, file.type)
    url = result.url
    storageKey = result.storageKey
  } catch (err) {
    console.error("R2 upload failed:", err)
    throw new Error("Gagal mengunggah file ke storage. Pastikan konfigurasi R2 sudah benar.")
  }

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const isImage = file.type.startsWith("image/")
  const finalMime = isImage && file.type !== "image/svg+xml" && file.type !== "image/gif"
    ? "image/webp"
    : file.type

  try {
    const [inserted] = await db
      .insert(schema.mediaAssets)
      .values({
        label: file.name,
        alt: file.name,
        kind: "image",
        storageKey,
        url,
        mimeType: finalMime,
        size: buffer.length,
      })
      .returning()

    resetMediaCache()
    revalidatePath("/admin/media-library")
    return inserted
  } catch (err) {
    console.error("Database insert failed:", err)
    throw new Error("Gagal menyimpan data media ke database. Silakan coba lagi.")
  }
}

export async function deleteMediaAction(id: string) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  let asset: any
  try {
    const result = await db
      .select()
      .from(schema.mediaAssets)
      .where(eq(schema.mediaAssets.id, id))
      .limit(1)
    asset = result[0]
  } catch (err) {
    console.error("Database query failed:", err)
    throw new Error("Gagal mengambil data media dari database.")
  }

  if (!asset) {
    throw new Error("Media tidak ditemukan. Mungkin sudah dihapus sebelumnya.")
  }

  try {
    await deleteAsset(asset.storageKey)
  } catch (err) {
    console.error("R2 delete failed:", err)
    throw new Error("Gagal menghapus file dari storage. Silakan coba lagi.")
  }

  try {
    await db.delete(schema.mediaAssets).where(eq(schema.mediaAssets.id, id))
  } catch (err) {
    console.error("Database delete failed:", err)
    throw new Error("Gagal menghapus data media dari database.")
  }

  resetMediaCache()
  revalidatePath("/admin/media-library")
  revalidatePath("/", "layout")
}

// -----------------------------------------------------------------------------
// Generic Collections Manager
// -----------------------------------------------------------------------------
function getTableBySlug(slug: string) {
  switch (slug) {
    case "navigation": return schema.navigationItems
    case "footer-quick-links": return schema.footerQuickLinks
    case "footer-social-links": return schema.footerSocialLinks
    case "hero-stats": return schema.heroStats
    case "partners-accreditation": return schema.partnerItems
    case "news": return schema.newsItems
    case "history-timeline": return schema.historyTimelineItems
    case "why-choose-us": return schema.whyUsItems
    case "education-highlights": return schema.educationHighlights
    case "education-programs": return schema.educationPrograms
    case "education-program-points": return schema.educationProgramPoints
    case "facility-highlights": return schema.facilityHighlights
    case "facilities": return schema.facilities
    case "faq-categories": return schema.faqCategories
    case "faq-items": return schema.faqItems
    case "testimonials": return schema.testimonials
    case "gallery": return schema.galleryItems
    case "profile-identity": return schema.profileIdentityRows
    case "profile-mission": return schema.profileMissionItems
    case "profile-goal": return schema.profileGoalItems
    case "profile-org": return schema.profileOrgRows
    case "profile-program": return schema.profileProgramRows
    case "contact-methods": return schema.contactMethods
    case "contact-locations": return schema.contactLocations
    default: throw new Error(`Unknown table slug: ${slug}`)
  }
}

export async function saveCollectionItemAction(slug: string, id: string | null, values: any) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const table = getTableBySlug(slug)

  // Ensure updatedAt is present
  const data = { ...values, updatedAt: new Date() }

  try {
    if (id) {
      await db.update(table).set(data).where(eq((table as any).id, id))
    } else {
      await db.insert(table).values(data)
    }
  } catch (err) {
    console.error("Database save failed:", err)
    throw new Error(`Gagal menyimpan data ${slug}. Silakan coba lagi.`)
  }

  revalidatePath("/", "layout")
}

export async function deleteCollectionItemAction(slug: string, id: string) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const table = getTableBySlug(slug)

  try {
    await db.delete(table).where(eq((table as any).id, id))
  } catch (err) {
    console.error("Database delete failed:", err)
    throw new Error(`Gagal menghapus item dari ${slug}. Silakan coba lagi.`)
  }

  revalidatePath("/", "layout")
}

export async function reorderCollectionItemsAction(slug: string, orderedIds: string[]) {
  await verifyAdminSession()

  const db = getDb()
  if (!db) throw new Error("Database tidak terhubung. Silakan coba lagi nanti.")

  const table = getTableBySlug(slug)

  try {
    for (let i = 0; i < orderedIds.length; i++) {
      await db
        .update(table)
        .set({ sortOrder: i, updatedAt: new Date() })
        .where(eq((table as any).id, orderedIds[i]))
    }
  } catch (err) {
    console.error("Database reorder failed:", err)
    throw new Error(`Gagal mengubah urutan item ${slug}. Silakan coba lagi.`)
  }

  revalidatePath("/", "layout")
}

export async function getMediaAssetsAction() {
  await verifyAdminSession()
  const db = getDb()
  if (!db) return []

  try {
    return await db.select().from(schema.mediaAssets).orderBy(schema.mediaAssets.createdAt)
  } catch (err) {
    console.error("Database query failed:", err)
    throw new Error("Gagal memuat data media. Silakan coba lagi.")
  }
}
