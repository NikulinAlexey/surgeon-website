import type { Metadata } from "next";
import { PublicContentDetail } from "@/components/PublicContentDetail";
import { getPublishedContentBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedContentBySlug(slug);
  if (!item || item.kind !== "ARTICLE") return { title: "Статья не найдена" };
  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt || undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  return <PublicContentDetail slug={slug} kind="ARTICLE" />;
}
