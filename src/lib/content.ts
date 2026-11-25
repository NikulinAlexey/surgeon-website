import { ContentKind } from "@/generated/prisma/client";
import { db } from "./db";
import { cleanHtml } from "./sanitize";

export async function getPublishedContent(kind: ContentKind, take = 12) {
  return db.contentEntry.findMany({
    where: { kind, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    include: { coverMedia: true, author: { select: { firstName: true, lastName: true } } },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getPublishedContentBySlug(slug: string) {
  return db.contentEntry.findFirst({
    where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    include: { coverMedia: true, author: { select: { firstName: true, lastName: true } } },
  });
}

export function contentPath(kind: ContentKind, slug: string) {
  return `/${kind === "ARTICLE" ? "articles" : "news"}/${slug}`;
}

export function safeBody(body: string) {
  return cleanHtml(body);
}
