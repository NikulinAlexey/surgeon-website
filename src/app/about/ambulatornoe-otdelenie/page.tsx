import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
const slug = "about/ambulatornoe-otdelenie";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage(slug);
  return { title: page?.seoTitle || "Амбулаторное отделение", description: page?.seoDescription || undefined };
}

export default function AmbulatornoeOtdeleniePage() {
  return <CmsTextPage slug={slug} />;
}
