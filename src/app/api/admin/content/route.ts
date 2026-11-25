import { NextRequest, NextResponse } from "next/server";
import { ContentKind, ContentStatus, Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { contentSchema } from "@/lib/validation";
import { cleanHtml } from "@/lib/sanitize";
import { storeFile, validateUpload } from "@/lib/storage";
import { writeAudit } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { contentPath } from "@/lib/content";

export async function GET(request: NextRequest) {
  try {
    await requireRole("EDITOR", "ADMIN");
    const params = request.nextUrl.searchParams;
    const query = params.get("query")?.trim() || "";
    const kind = params.get("kind");
    const status = params.get("status");
    const where: Prisma.ContentEntryWhereInput = {
      ...(query ? { OR: [
        { title: { contains: query, mode: "insensitive" } },
        { slug: { contains: query, mode: "insensitive" } },
      ] } : {}),
      ...(kind && Object.values(ContentKind).includes(kind as ContentKind) ? { kind: kind as ContentKind } : {}),
      ...(status && Object.values(ContentStatus).includes(status as ContentStatus) ? { status: status as ContentStatus } : {}),
    };
    const entries = await db.contentEntry.findMany({
      where,
      include: { coverMedia: true, author: { select: { email: true } } },
      orderBy: { updatedAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ entries });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const form = await request.formData();
    const input = contentSchema.parse(JSON.parse(String(form.get("payload") || "{}")));
    const cover = form.get("cover");
    let coverMediaId: string | undefined;
    if (cover instanceof File && cover.size > 0) {
      if (!cover.type.startsWith("image/")) throw new HttpError(400, "Обложка должна быть изображением");
      const data = await validateUpload(cover);
      const storageKey = await storeFile(data, cover.type);
      const media = await db.media.create({ data: {
        storageKey, originalName: cover.name.slice(0, 240), mimeType: cover.type,
        size: cover.size, uploadedById: editor.id, isPublic: true,
      } });
      coverMediaId = media.id;
    }
    const publishedAt = input.status === "PUBLISHED"
      ? input.publishedAt ? new Date(input.publishedAt) : new Date() : null;
    const entry = await db.contentEntry.create({ data: {
      ...input,
      body: cleanHtml(input.body),
      publishedAt,
      authorId: editor.id,
      coverMediaId,
    } });
    await db.contentRevision.create({ data: {
      contentId: entry.id, editorId: editor.id, title: entry.title, excerpt: entry.excerpt,
      body: entry.body, seoTitle: entry.seoTitle, seoDescription: entry.seoDescription,
    } });
    await writeAudit(editor.id, "CONTENT_CREATED", "ContentEntry", entry.id, { kind: entry.kind, status: entry.status });
    revalidatePath("/");
    revalidatePath(contentPath(entry.kind, entry.slug));
    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
