import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";
const slug = "about/urologicheskoe-otdelenie";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage(slug);
  return { title: page?.seoTitle || "Урологическое отделение", description: page?.seoDescription || undefined };
}

export default function UrologicheskoeOtdeleniePage() {
  return <CmsTextPage slug={slug} />;
}
