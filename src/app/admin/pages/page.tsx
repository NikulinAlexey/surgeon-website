import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser, isContentEditor } from "@/lib/auth";
import { formatDate } from "@/components/admin/AdminStates";

export default async function AdminPagesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/pages");
  if (!isContentEditor(user)) redirect("/profile");
  const pages = await db.page.findMany({ orderBy: { slug: "asc" }, include: { revisions: { take: 1, orderBy: { createdAt: "desc" }, include: { editor: { select: { email: true } } } } } });
  return (
    <div className="admin-page"><header className="admin-page__header"><div><p className="admin__eyebrow">Содержимое сайта</p><h1>Страницы и FAQ</h1></div></header>
      <p className="admin__lead">Выберите страницу, чтобы изменить заголовки, основной текст, вопросы и поисковое описание.</p>
      <div className="admin-page-list">{pages.map((page) => <article key={page.id}><div><h2>{page.title}</h2><p>{page.slug}</p><small>Обновлена: {formatDate(page.updatedAt.toISOString())}{page.revisions[0] ? ` · ${page.revisions[0].editor.email}` : ""}</small></div><div className="admin-actions"><Link href={`/admin/pages/${page.slug.split("/").map(encodeURIComponent).join("/")}`}>Редактировать</Link><Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank">На сайте</Link></div></article>)}</div>
    </div>
  );
}
