import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser, isContentEditor } from "@/lib/auth";
import { contentStatusLabels, formatDate } from "@/components/admin/AdminStates";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !isContentEditor(user)) return null;
  const [articles, news, drafts, pages, recentEntries, recentPages] = await Promise.all([
    db.contentEntry.count({ where: { kind: "ARTICLE", status: "PUBLISHED" } }),
    db.contentEntry.count({ where: { kind: "NEWS", status: "PUBLISHED" } }),
    db.contentEntry.count({ where: { status: "DRAFT" } }),
    db.page.count(),
    db.contentEntry.findMany({ orderBy: { updatedAt: "desc" }, take: 5, select: { id: true, title: true, status: true, updatedAt: true } }),
    db.page.findMany({ orderBy: { updatedAt: "desc" }, take: 5, select: { slug: true, title: true, updatedAt: true } }),
  ]);
  const adminStats = user.role === "ADMIN" ? await Promise.all([
    db.user.count(),
    db.verificationRequest.count({ where: { status: "PENDING" } }),
  ]) : null;

  const stats = [
    { label: "Опубликованные статьи", value: articles, href: "/admin/content?kind=ARTICLE&status=PUBLISHED" },
    { label: "Опубликованные новости", value: news, href: "/admin/content?kind=NEWS&status=PUBLISHED" },
    { label: "Черновики", value: drafts, href: "/admin/content?status=DRAFT" },
    { label: "Редактируемые страницы", value: pages, href: "/admin/pages" },
    ...(adminStats ? [
      { label: "Пользователи", value: adminStats[0], href: "/admin/users" },
      { label: "Заявки на проверке", value: adminStats[1], href: "/admin/verifications?status=PENDING" },
    ] : []),
  ];

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Рабочая область</p><h1>Обзор</h1><p className="admin__lead">Состояние контента и быстрый переход к текущим задачам.</p></div><Link className="admin-button admin-button--primary" href="/admin/content/new">Добавить материал</Link></header>
      <dl className="admin-stats">
        {stats.map((stat) => <div key={stat.label} className={stat.label === "Заявки на проверке" && stat.value > 0 ? "admin-stat--attention" : ""}><dt><Link href={stat.href}>{stat.label}</Link></dt><dd><Link href={stat.href} aria-label={`${stat.label}: ${stat.value}`}>{stat.value}</Link></dd></div>)}
      </dl>
      <div className="admin-dashboard-grid">
        <section className="admin-section"><div className="admin-section__header"><h2>Недавние материалы</h2><Link href="/admin/content">Все материалы</Link></div>{recentEntries.length ? <div className="admin-recent-list">{recentEntries.map((entry) => <article key={entry.id}><div><Link href={`/admin/content/${entry.id}`}>{entry.title}</Link><small>{formatDate(entry.updatedAt.toISOString())}</small></div><span className={`admin-status admin-status--${entry.status.toLowerCase()}`}>{contentStatusLabels[entry.status]}</span></article>)}</div> : <p className="admin__muted">Материалов пока нет.</p>}</section>
        <section className="admin-section"><div className="admin-section__header"><h2>Изменённые страницы</h2><Link href="/admin/pages">Все страницы</Link></div><div className="admin-recent-list">{recentPages.map((page) => <article key={page.slug}><div><Link href={`/admin/pages/${page.slug}`}>{page.title}</Link><small>{formatDate(page.updatedAt.toISOString())}</small></div></article>)}</div></section>
      </div>
      <section className="admin-section"><h2>Быстрые действия</h2><div className="admin-actions"><Link className="admin-button" href="/admin/pages">Изменить текст страницы</Link><Link className="admin-button" href="/admin/settings">Обновить контакты</Link>{user.role === "ADMIN" && <Link className="admin-button" href="/admin/verifications">Проверить специалистов</Link>}</div></section>
    </div>
  );
}
