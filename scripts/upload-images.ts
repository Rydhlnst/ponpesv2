import { readFileSync } from "fs"
import { join } from "path"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { eq } from "drizzle-orm"
import * as dotenv from "dotenv"
import * as schema from "../lib/db/schema"

dotenv.config()

console.log("R2_ACCOUNT_ID:", process.env.R2_ACCOUNT_ID ? "SET" : "NOT SET")
console.log("R2_ACCESS_KEY_ID:", process.env.R2_ACCESS_KEY_ID ? "SET" : "NOT SET")
console.log("R2_SECRET_ACCESS_KEY:", process.env.R2_SECRET_ACCESS_KEY ? "SET" : "NOT SET")
console.log("R2_BUCKET_NAME:", process.env.R2_BUCKET_NAME)
console.log("R2_PUBLIC_URL:", process.env.R2_PUBLIC_URL)

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
})

const databaseUrl = process.env.DATABASE_URL!

const imagesToUpload = [
  { localPath: "public/gallery/gallery-01.jpeg", storageKey: "gallery/gallery-01.webp", label: "Gallery 1", alt: "Suasana belajar mengajar santri tahfizh As Salam Metro" },
  { localPath: "public/gallery/gallery-02.jpeg", storageKey: "gallery/gallery-02.webp", label: "Gallery 2", alt: "Santri-santri As Salam berbaris tertib dan disiplin" },
  { localPath: "public/gallery/gallery-03.jpeg", storageKey: "gallery/gallery-03.webp", label: "Gallery 3", alt: "Kegiatan kajian dan tadabbur Al-Qur'an santri As Salam" },
  { localPath: "public/gallery/gallery-04.jpeg", storageKey: "gallery/gallery-04.webp", label: "Gallery 4", alt: "Wisuda kelulusan santri tahfizh As Salam Metro" },
  { localPath: "public/gallery/gallery-05.jpeg", storageKey: "gallery/gallery-05.webp", label: "Gallery 5", alt: "Pembangunan dan fasilitas penunjang belajar mengajar" },
  { localPath: "public/gallery/gallery-06.jpeg", storageKey: "gallery/gallery-06.webp", label: "Gallery 6", alt: "Kegiatan ekstrakurikuler kepanduan pramuka santri" },
  { localPath: "public/gallery/gallery-07.jpeg", storageKey: "gallery/gallery-07.webp", label: "Gallery 7", alt: "Kegiatan olahraga pagi dan kebersamaan santri" },
  { localPath: "public/gallery/gallery-08.jpeg", storageKey: "gallery/gallery-08.webp", label: "Gallery 8", alt: "Profil Pondok Pesantren As Salam Metro Indonesia" },
  { localPath: "public/gallery/gallery-09.jpeg", storageKey: "gallery/gallery-09.webp", label: "Gallery 9", alt: "Lingkungan dan sarana Pondok Pesantren As Salam Metro" },
  { localPath: "public/logo.png", storageKey: "logo/logo.webp", label: "Primary Logo", alt: "Logo Pondok Pesantren As Salam Metro" },
]

async function main() {
  console.log("\n=== UPLOADING IMAGES TO R2 ===\n")

  const client = postgres(databaseUrl!, { max: 1, ssl: "require" })
  const db = drizzle(client)

  const uploaded: { storageKey: string; url: string; label: string; id: string }[] = []

  for (const img of imagesToUpload) {
    try {
      const filePath = join(process.cwd(), img.localPath)
      const buffer = readFileSync(filePath)

      // Compress to webp
      const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer()

      console.log(`Uploading ${img.label}...`)

      await r2Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: img.storageKey,
          Body: webpBuffer,
          ContentType: "image/webp",
        })
      )

      const url = `${process.env.R2_PUBLIC_URL}/${img.storageKey}`
      console.log(`  ✅ ${url}`)

      uploaded.push({ ...img, url })
    } catch (err) {
      console.error(`  ❌ Failed ${img.label}: ${err}`)
    }
  }

  console.log("\n=== UPDATING DATABASE ===\n")

  // Clear and re-insert media_assets
  const dbSchema = drizzle(client, { schema })

  await dbSchema.delete(schema.mediaAssets)

  for (const item of uploaded) {
    const [row] = await dbSchema.insert(schema.mediaAssets).values({
      label: item.label,
      alt: item.alt,
      kind: "image",
      storageKey: item.storageKey,
      url: item.url,
    }).returning()
    item.id = row.id
    console.log(`  ✅ Inserted media: ${item.label}`)
  }

  // Link logo to site_settings
  const logoItem = uploaded.find(i => i.label === "Primary Logo")
  if (logoItem) {
    await dbSchema.update(schema.siteSettings).set({ logoMediaId: logoItem.id }).where(eq(schema.siteSettings.id, "site"))
    console.log(`  ✅ Linked logo to site_settings`)
  }

  // Link hero & faq images on homepage
  const heroItem = uploaded.find(i => i.label === "Gallery 8")
  if (heroItem) {
    await dbSchema.update(schema.homepageSections).set({
      heroImageMediaId: heroItem.id,
      faqImageMediaId: heroItem.id,
    }).where(eq(schema.homepageSections.id, "homepage"))
    console.log(`  ✅ Linked hero & faq images to homepage`)
  }

  // Link news covers
  const newsCovers = ["Gallery 4", "Gallery 1", "Gallery 3"]
  const newsRows = await dbSchema.select().from(schema.newsItems).orderBy(schema.newsItems.sortOrder)
  for (let i = 0; i < Math.min(newsCovers.length, newsRows.length); i++) {
    const item = uploaded.find(u => u.label === newsCovers[i])
    if (item) {
      await dbSchema.update(schema.newsItems).set({ coverMediaId: item.id }).where(eq(schema.newsItems.id, newsRows[i].id))
      console.log(`  ✅ Linked cover to news: ${newsRows[i].title}`)
    }
  }

  // Link education program images
  const eduImages = ["Gallery 2", "Gallery 4", "Gallery 1", "Gallery 3"]
  const eduRows = await dbSchema.select().from(schema.educationPrograms).orderBy(schema.educationPrograms.sortOrder)
  for (let i = 0; i < Math.min(eduImages.length, eduRows.length); i++) {
    const item = uploaded.find(u => u.label === eduImages[i])
    if (item) {
      await dbSchema.update(schema.educationPrograms).set({ imageMediaId: item.id }).where(eq(schema.educationPrograms.id, eduRows[i].id))
      console.log(`  ✅ Linked image to education: ${eduRows[i].name}`)
    }
  }

  // Link facility images
  const facImages = ["Gallery 9", "Gallery 1", "Gallery 3", "Gallery 6", "Gallery 8", "Gallery 7"]
  const facRows = await dbSchema.select().from(schema.facilities).orderBy(schema.facilities.sortOrder)
  for (let i = 0; i < Math.min(facImages.length, facRows.length); i++) {
    const item = uploaded.find(u => u.label === facImages[i])
    if (item) {
      await dbSchema.update(schema.facilities).set({ imageMediaId: item.id }).where(eq(schema.facilities.id, facRows[i].id))
      console.log(`  ✅ Linked image to facility: ${facRows[i].name}`)
    }
  }

  // Link gallery items
  const galleryLabels = ["Gallery 1","Gallery 2","Gallery 3","Gallery 4","Gallery 5","Gallery 6","Gallery 7","Gallery 8","Gallery 9"]
  const galleryRows = await dbSchema.select().from(schema.galleryItems).orderBy(schema.galleryItems.sortOrder)
  for (let i = 0; i < Math.min(galleryLabels.length, galleryRows.length); i++) {
    const item = uploaded.find(u => u.label === galleryLabels[i])
    if (item) {
      await dbSchema.update(schema.galleryItems).set({ imageMediaId: item.id }).where(eq(schema.galleryItems.id, galleryRows[i].id))
      console.log(`  ✅ Linked image to gallery: ${galleryRows[i].alt}`)
    }
  }

  console.log("\n=== ALL DONE ===")
  await client.end()
}

main().catch(console.error)
