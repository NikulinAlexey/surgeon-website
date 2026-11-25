import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { contentSchema } from "@/lib/validation";
import { cleanHtml } from "@/lib/sanitize";
import { storeFile, validateUpload } from "@/lib/storage";
import { writeAudit } from "@/lib/audit";
import { contentPath } from "@/lib/content";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    const entry = await db.contentEntry.findUnique({
      where: { id },
      include: {
        coverMedia: true,
        revisions: { orderBy: { createdAt: "desc" }, take: 30, include: { editor: { select: { email: true } } } },
      },
    });
    if (!entry) throw new HttpError(404, "Материал не найден");
    return NextResponse.json({ entry });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    const previous = await db.contentEntry.findUnique({ where: { id } });
    if (!previous) throw new HttpError(404, "Материал не найден");
    const form = await request.formData();
    let input = contentSchema.parse(JSON.parse(String(form.get("payload") || "{}")));
    const restoreRevisionId = String(form.get("restoreRevisionId") || "");
    if (restoreRevisionId) {
      const revision = await db.contentRevision.findFirst({ where: { id: restoreRevisionId, contentId: id } });
      if (!revision) throw new HttpError(404, "Версия не найдена");
      input = { ...input, title: revision.title, excerpt: revision.excerpt, body: revision.body,
        seoTitle: revision.seoTitle || "", seoDescription: revision.seoDescription || "" };
    }

    const cover = form.get("cover");
    const removeCover = form.get("removeCover") === "true";
    let coverMediaId = removeCover ? null : previous.coverMediaId;
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
      ? input.publishedAt ? new Date(input.publishedAt) : previous.publishedAt || new Date() : null;
    const entry = await db.$transaction(async (tx) => {
      const updated = await tx.contentEntry.update({ where: { id }, data: {
        ...input, body: cleanHtml(input.body), publishedAt, coverMediaId,
      } });
      await tx.contentRevision.create({ data: {
        contentId: id, editorId: editor.id, title: updated.title, excerpt: updated.excerpt,
        body: updated.body, seoTitle: updated.seoTitle, seoDescription: updated.seoDescription,
      } });
      return updated;
    });
    await writeAudit(editor.id, restoreRevisionId ? "CONTENT_REVISION_RESTORED" : "CONTENT_UPDATED", "ContentEntry", id, {
      status: entry.status, restoreRevisionId: restoreRevisionId || undefined,
    });
    revalidatePath("/");
    revalidatePath(contentPath(previous.kind, previous.slug));
    revalidatePath(contentPath(entry.kind, entry.slug));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    const entry = await db.contentEntry.update({ where: { id }, data: { status: "ARCHIVED" } });
    await writeAudit(editor.id, "CONTENT_ARCHIVED", "ContentEntry", id);
    revalidatePath("/");
    revalidatePath(contentPath(entry.kind, entry.slug));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
