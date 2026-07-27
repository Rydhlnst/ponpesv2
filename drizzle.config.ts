import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://neondb_owner:npg_LTSGb0pNwD6c@ep-still-queen-azrxn8zm-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
  strict: true,
  verbose: true,
})
