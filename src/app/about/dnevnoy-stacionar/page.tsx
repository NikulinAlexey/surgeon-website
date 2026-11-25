import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
const slug = "about/dnevnoy-stacionar";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage(slug);
  return { title: page?.seoTitle || "Дневной стационар", description: page?.seoDescription || undefined };
}

export default function DnevnoyStacionarPage() {
  return <CmsTextPage slug={slug} />;
}
