import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("privacy");
  return { title: page?.seoTitle || "Политика конфиденциальности", description: page?.seoDescription || undefined };
}

export default function PrivacyPage() {
  return <CmsTextPage slug="privacy" showFaq={false} />;
}
