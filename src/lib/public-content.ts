import { ContentKind } from "@/generated/prisma/client";

export interface PublicContentCard {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  img?: string;
  imageAlt: string;
  kind: ContentKind;
}

interface ContentWithCover {
  id: string;
  kind: ContentKind;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: Date | null;
  updatedAt: Date;
  coverMedia: { id: string } | null;
  coverAlt: string | null;
}

export function toPublicContentCard(item: ContentWithCover): PublicContentCard {
  const date = item.publishedAt ?? item.updatedAt;
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    description: item.excerpt,
    slug: item.slug,
    date: new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date),
    img: item.coverMedia ? `/api/media/${item.coverMedia.id}` : undefined,
    imageAlt: item.coverAlt || item.title,
  };
}
