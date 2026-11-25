import type { Metadata } from "next";
import { PublicContentDetail } from "@/components/PublicContentDetail";
import { getPublishedContentBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedContentBySlug(slug);
  if (!item || item.kind !== "NEWS") return { title: "Новость не найдена" };
  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt || undefined,
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  return <PublicContentDetail slug={slug} kind="NEWS" />;
}
