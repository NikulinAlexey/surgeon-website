import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser, isContentEditor } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !isContentEditor(user)) return null;
  const [articles, news, drafts, pages] = await Promise.all([
    db.contentEntry.count({ where: { kind: "ARTICLE", status: "PUBLISHED" } }),
    db.contentEntry.count({ where: { kind: "NEWS", status: "PUBLISHED" } }),
    db.contentEntry.count({ where: { status: "DRAFT" } }),
    db.page.count(),
  ]);
  const adminStats = user.role === "ADMIN" ? await Promise.all([
    db.user.count(),
    db.verificationRequest.count({ where: { status: "PENDING" } }),
  ]) : null;

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Рабочая область</p><h1>Обзор</h1></div><Link className="admin-button admin-button--primary" href="/admin/content/new">Добавить материал</Link></header>
      <dl className="admin-stats">
        <div><dt>Опубликованные статьи</dt><dd>{articles}</dd></div>
        <div><dt>Опубликованные новости</dt><dd>{news}</dd></div>
        <div><dt>Черновики</dt><dd>{drafts}</dd></div>
        <div><dt>Редактируемые страницы</dt><dd>{pages}</dd></div>
        {adminStats && <><div><dt>Пользователи</dt><dd>{adminStats[0]}</dd></div><div><dt>Заявки на проверке</dt><dd>{adminStats[1]}</dd></div></>}
      </dl>
      <section className="admin-section"><h2>Быстрые действия</h2><div className="admin-actions"><Link href="/admin/pages">Изменить текст страницы</Link><Link href="/admin/settings">Обновить контакты</Link>{user.role === "ADMIN" && <Link href="/admin/verifications">Проверить специалистов</Link>}</div></section>
    </div>
  );
}
