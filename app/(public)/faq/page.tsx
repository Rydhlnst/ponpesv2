import { getFaqSection } from "@/lib/db/queries"
import { getIconComponent } from "@/lib/cms/icons"
import { FaqPageClient } from "./faq-client"

function richTextToPlainText(richText: unknown): string {
  if (typeof richText === "string") return richText
  if (!richText || typeof richText !== "object") return ""
  const doc = richText as { content?: Array<{ content?: Array<{ text?: string }> }> }
  if (!doc.content) return ""
  return doc.content
    .map((block) => block.content?.map((inline) => inline.text || "").join("") || "")
    .join("\n")
}

export default async function FaqPage() {
  const categories = await getFaqSection()

  const faqCategories = categories.map((cat) => ({
    category: cat.name,
    icon: getIconComponent(cat.iconKey),
    items: cat.items.map((item) => ({
      question: item.question,
      answer: richTextToPlainText(item.answer),
    })),
  }))

  return <FaqPageClient faqCategories={faqCategories} />
}
