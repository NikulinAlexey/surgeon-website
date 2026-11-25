import { db } from "./db";
import { cleanHtml } from "./sanitize";
import { FAQItem } from "@/types/components/faqItem";

export interface CmsPageData {
  title: string;
  subtitle: string;
  body: string;
  faq: FAQItem[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export async function getCmsPage(slug: string): Promise<CmsPageData | null> {
  const page = await db.page.findUnique({ where: { slug } });
  if (!page) return null;
  return {
    title: page.title,
    subtitle: page.subtitle,
    body: cleanHtml(page.body),
    faq: Array.isArray(page.faq) ? page.faq as unknown as FAQItem[] : [],
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
  };
}

export async function getSiteSettings() {
  return db.siteSettings.upsert({ where: { id: 1 }, create: {}, update: {} });
}
