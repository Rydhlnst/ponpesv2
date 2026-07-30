import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import { asc } from "drizzle-orm"
import postgres from "postgres"
import * as schema from "../lib/db/schema"

dotenv.config()

const client = postgres(process.env.DATABASE_URL, { max: 1, ssl: "require" })
const db = drizzle(client, { schema })

async function main() {
  const gallery = await db.select().from(schema.galleryItems).orderBy(asc(schema.galleryItems.sortOrder))
  console.log("GALLERY (sorted by sortOrder):")
  for (const g of gallery) {
    console.log(`  sortOrder=${g.sortOrder} | alt=${g.alt}`)
  }
  await client.end()
}
main().catch(console.error)
