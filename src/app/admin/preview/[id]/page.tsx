import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser, isContentEditor } from "@/lib/auth";
import { safeBody } from "@/lib/content";

export default async function ContentPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin");
  if (!isContentEditor(user)) redirect("/profile");
  const { id } = await params;
  const entry = await db.contentEntry.findUnique({ where: { id }, include: { coverMedia: true } });
  if (!entry) notFound();
  return (
    <article className="admin-page admin-preview">
      <Link href={`/admin/content/${entry.id}`} className="admin__back">← Вернуться к редактированию</Link>
      <p className="admin__eyebrow">Предпросмотр · {entry.status === "PUBLISHED" ? "опубликован" : entry.status === "DRAFT" ? "черновик" : "архив"}</p>
      <h1>{entry.title}</h1>
      <p className="admin-preview__excerpt">{entry.excerpt}</p>
      {entry.coverMedia && <Image className="admin-preview__cover" src={`/api/media/${entry.coverMedia.id}`} alt={entry.coverAlt || ""} width={1200} height={675} priority />}
      <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(entry.body) }} />
    </article>
  );
}
