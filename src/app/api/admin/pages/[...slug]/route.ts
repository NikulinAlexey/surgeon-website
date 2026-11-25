import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { pageSchema } from "@/lib/validation";
import { cleanHtml, cleanText } from "@/lib/sanitize";
import { writeAudit } from "@/lib/audit";

function publicPath(slug: string) {
  return slug === "home" ? "/" : `/${slug}`;
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    await requireRole("EDITOR", "ADMIN");
    const { slug: segments } = await params;
    const slug = segments.join("/");
    const page = await db.page.findUnique({
      where: { slug },
      include: { revisions: { orderBy: { createdAt: "desc" }, take: 30, include: { editor: { select: { email: true } } } } },
    });
    if (!page) throw new HttpError(404, "Страница не найдена");
    return NextResponse.json({ page });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { slug: segments } = await params;
    const slug = segments.join("/");
    let input = pageSchema.parse(await request.json());
    if (input.restoreRevisionId) {
      const revision = await db.pageRevision.findFirst({
        where: { id: input.restoreRevisionId, page: { slug } },
      });
      if (!revision) throw new HttpError(404, "Версия не найдена");
      input = {
        ...input,
        title: revision.title,
        subtitle: revision.subtitle,
        body: revision.body,
        faq: pageSchema.shape.faq.parse(revision.faq),
        seoTitle: revision.seoTitle || "",
        seoDescription: revision.seoDescription || "",
      };
    }
    const data = {
      title: cleanText(input.title),
      subtitle: cleanText(input.subtitle),
      body: cleanHtml(input.body),
      faq: input.faq.map((item) => ({ ...item, question: cleanText(item.question), answer: cleanText(item.answer) })),
      seoTitle: cleanText(input.seoTitle) || null,
      seoDescription: cleanText(input.seoDescription) || null,
    };
    const page = await db.$transaction(async (tx) => {
      const saved = await tx.page.upsert({ where: { slug }, create: { slug, ...data }, update: data });
      await tx.pageRevision.create({ data: { pageId: saved.id, editorId: editor.id, ...data } });
      return saved;
    });
    await writeAudit(editor.id, input.restoreRevisionId ? "PAGE_REVISION_RESTORED" : "PAGE_UPDATED", "Page", page.id, { slug, restoreRevisionId: input.restoreRevisionId });
    revalidatePath(publicPath(slug));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
