import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../lib/db/schema"

dotenv.config()

const client = postgres(process.env.DATABASE_URL!, { max: 1, ssl: "require" })
const db = drizzle(client, { schema })

async function main() {
  const gallery = await db.select().from(schema.galleryItems)
  console.log("GALLERY ITEMS:")
  for (const g of gallery) {
    console.log(`  alt=${g.alt} | mediaId=${g.imageMediaId ?? "NULL"}`)
  }

  const edu = await db.select().from(schema.educationPrograms)
  console.log("\nEDUCATION PROGRAMS:")
  for (const e of edu) {
    console.log(`  ${e.name} | mediaId=${e.imageMediaId ?? "NULL"}`)
  }

  const fac = await db.select().from(schema.facilities)
  console.log("\nFACILITIES:")
  for (const f of fac) {
    console.log(`  ${f.name} | mediaId=${f.imageMediaId ?? "NULL"}`)
  }

  const news = await db.select().from(schema.newsItems)
  console.log("\nNEWS ITEMS:")
  for (const n of news) {
    console.log(`  ${n.title} | coverMediaId=${n.coverMediaId ?? "NULL"}`)
  }

  const [home] = await db.select().from(schema.homepageSections).limit(1)
  console.log("\nHOMEPAGE:")
  console.log(`  id=${home?.id}`)
  console.log(`  heroImageMediaId=${home?.heroImageMediaId ?? "NULL"}`)
  console.log(`  faqImageMediaId=${home?.faqImageMediaId ?? "NULL"}`)

  const [site] = await db.select().from(schema.siteSettings).limit(1)
  console.log("\nSITE SETTINGS:")
  console.log(`  id=${site?.id}`)
  console.log(`  logoMediaId=${site?.logoMediaId ?? "NULL"}`)

  await client.end()
}
main().catch(console.error)
