import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "../lib/db/schema"
import { sql } from "drizzle-orm"

dotenv.config()

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

async function main() {
  const client = postgres(databaseUrl!, { max: 1, ssl: "require" })
  const db = drizzle(client, { schema })

  console.log("=== VERIFYING DATABASE CONTENT ===\n")

  // 1. Site Settings
  const [site] = await db.select().from(schema.siteSettings).limit(1)
  console.log("1. SITE SETTINGS:")
  console.log(`   Name: ${site?.name}`)
  console.log(`   Short Name: ${site?.shortName}`)
  console.log(`   Tagline: ${site?.tagline}`)
  console.log(`   WhatsApp: ${site?.whatsapp}`)
  console.log(`   Email: ${site?.email}`)
  console.log(`   Address: ${site?.address}`)
  console.log(`   Office Hours: ${site?.officeHours}`)

  // Check for Al Itqan references
  const siteStr = JSON.stringify(site)
  const hasAlItqan = siteStr?.toLowerCase().includes("al itqan") || siteStr?.toLowerCase().includes("alitqan")
  console.log(`   Contains "Al Itqan": ${hasAlItqan ? "❌ FOUND!" : "✅ Clean"}`)

  // 2. Homepage
  const [home] = await db.select().from(schema.homepageSections).limit(1)
  console.log("\n2. HOMEPAGE:")
  console.log(`   Hero Title: ${home?.heroTitle}`)
  console.log(`   Hero Badge: ${home?.heroBadge}`)
  console.log(`   News Title: ${home?.newsTitle}`)
  console.log(`   Why Us Title: ${home?.whyUsTitle}`)
  console.log(`   History Title: ${home?.historyTitle}`)
  console.log(`   Education Title: ${home?.educationTitle}`)
  console.log(`   Facilities Title: ${home?.facilitiesTitle}`)
  console.log(`   Testimonials Title: ${home?.testimonialsTitle}`)
  console.log(`   Bottom CTA Title: ${home?.bottomCtaTitle}`)

  const homeStr = JSON.stringify(home)
  const homeHasAlItqan = homeStr?.toLowerCase().includes("al itqan") || homeStr?.toLowerCase().includes("alitqan")
  console.log(`   Contains "Al Itqan": ${homeHasAlItqan ? "❌ FOUND!" : "✅ Clean"}`)

  // 3. News Items
  const news = await db.select().from(schema.newsItems)
  console.log("\n3. NEWS ITEMS:")
  for (const n of news) {
    console.log(`   - ${n.title} (${n.dateLabel})`)
  }
  const newsStr = JSON.stringify(news)
  const newsHasAlItqan = newsStr?.toLowerCase().includes("al itqan") || newsStr?.toLowerCase().includes("alitqan")
  console.log(`   Contains "Al Itqan": ${newsHasAlItqan ? "❌ FOUND!" : "✅ Clean"}`)

  // 4. Education Programs
  const programs = await db.select().from(schema.educationPrograms)
  console.log("\n4. EDUCATION PROGRAMS:")
  for (const p of programs) {
    console.log(`   - ${p.name}`)
  }

  // 5. Facilities
  const facilities = await db.select().from(schema.facilities)
  console.log("\n5. FACILITIES:")
  for (const f of facilities) {
    console.log(`   - ${f.name}`)
  }

  // 6. FAQ
  const faqCats = await db.select().from(schema.faqCategories)
  const faqItems = await db.select().from(schema.faqItems)
  console.log("\n6. FAQ:")
  console.log(`   Categories: ${faqCats.length}`)
  console.log(`   Items: ${faqItems.length}`)
  for (const cat of faqCats) {
    console.log(`   - ${cat.name}`)
  }
  const faqStr = JSON.stringify(faqItems)
  const faqHasAlItqan = faqStr?.toLowerCase().includes("al itqan") || faqStr?.toLowerCase().includes("alitqan")
  console.log(`   Contains "Al Itqan": ${faqHasAlItqan ? "❌ FOUND!" : "✅ Clean"}`)

  // 7. Testimonials
  const testimonials = await db.select().from(schema.testimonials)
  console.log("\n7. TESTIMONIALS:")
  for (const t of testimonials) {
    console.log(`   - ${t.name} (${t.role})`)
  }

  // 8. Profile
  const [profile] = await db.select().from(schema.profilePage).limit(1)
  const identityRows = await db.select().from(schema.profileIdentityRows)
  const orgRows = await db.select().from(schema.profileOrgRows)
  console.log("\n8. PROFILE:")
  console.log(`   Page Title: ${profile?.pageTitle}`)
  console.log(`   Identity Rows: ${identityRows.length}`)
  console.log(`   Org Rows: ${orgRows.length}`)

  // 9. Contact
  const [contact] = await db.select().from(schema.contactPage).limit(1)
  const methods = await db.select().from(schema.contactMethods)
  const locations = await db.select().from(schema.contactLocations)
  console.log("\n9. CONTACT:")
  console.log(`   Page Title: ${contact?.pageTitle}`)
  console.log(`   Methods: ${methods.length}`)
  for (const m of methods) {
    console.log(`   - ${m.type}: ${m.value}`)
  }
  console.log(`   Locations: ${locations.length}`)
  for (const l of locations) {
    console.log(`   - ${l.title}: ${l.subtitle}`)
    console.log(`     Map URL contains Al Itqan: ${l.mapEmbedUrl?.toLowerCase().includes("al itqan") ? "❌ FOUND!" : "✅ Clean"}`)
  }

  // 10. Footer
  const [footer] = await db.select().from(schema.footerSettings).limit(1)
  const socialLinks = await db.select().from(schema.footerSocialLinks)
  console.log("\n10. FOOTER:")
  console.log(`   Brand Text: ${typeof footer?.brandText === 'string' ? footer.brandText : 'JSON'}`)
  console.log(`   Social Links: ${socialLinks.length}`)
  for (const s of socialLinks) {
    console.log(`   - ${s.platform}: ${s.href}`)
  }

  // 11. Navigation
  const nav = await db.select().from(schema.navigationItems)
  console.log("\n11. NAVIGATION:")
  for (const n of nav) {
    console.log(`   - ${n.label}: ${n.href}`)
  }

  // 12. Gallery
  const gallery = await db.select().from(schema.galleryItems)
  console.log("\n12. GALLERY:")
  console.log(`   Items: ${gallery.length}`)
  for (const g of gallery) {
    console.log(`   - ${g.alt}`)
  }

  // 13. Timeline
  const timeline = await db.select().from(schema.historyTimelineItems)
  console.log("\n13. HISTORY TIMELINE:")
  for (const t of timeline) {
    console.log(`   - ${t.year}: ${t.title}`)
  }

  // 14. Media Assets
  const media = await db.select().from(schema.mediaAssets)
  console.log("\n14. MEDIA ASSETS:")
  console.log(`   Total: ${media.length}`)

  // FULL SCAN for Al Itqan
  console.log("\n=== FULL DATABASE SCAN FOR 'AL ITQAN' ===")
  const allTables = [
    { name: "site_settings", data: site },
    { name: "homepage_sections", data: home },
    { name: "news_items", data: news },
    { name: "education_programs", data: programs },
    { name: "facilities", data: facilities },
    { name: "faq_items", data: faqItems },
    { name: "testimonials", data: testimonials },
    { name: "profile_page", data: profile },
    { name: "contact_page", data: contact },
    { name: "contact_methods", data: methods },
    { name: "contact_locations", data: locations },
    { name: "footer_settings", data: footer },
  ]

  let totalIssues = 0
  for (const table of allTables) {
    const str = JSON.stringify(table.data).toLowerCase()
    if (str.includes("al itqan") || str.includes("alitqan")) {
      console.log(`   ❌ FOUND in ${table.name}!`)
      totalIssues++
    }
  }

  if (totalIssues === 0) {
    console.log("   ✅ ALL CLEAN - No 'Al Itqan' references found anywhere!")
  }

  console.log("\n=== VERIFICATION COMPLETE ===")

  await client.end()
}

main().catch(console.error)
