import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("conferences");
  return { title: page?.seoTitle || "Конференции", description: page?.seoDescription || undefined };
}

export default function ConferencesPage() {
  return <CmsTextPage slug="conferences" showFaq={false} />;
}
