import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("terms");
  return { title: page?.seoTitle || "Пользовательское соглашение", description: page?.seoDescription || undefined };
}

export default function TermsPage() {
  return <CmsTextPage slug="terms" showFaq={false} />;
}
