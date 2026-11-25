"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, contentStatusLabels, formatDate } from "./AdminStates";
import type { ContentKind, ContentListItem, ContentStatus } from "./types";

export function ContentList() {
  const [entries, setEntries] = useState<ContentListItem[]>([]);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ContentKind | "">("");
  const [status, setStatus] = useState<ContentStatus | "">("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (kind) params.set("kind", kind);
      if (status) params.set("status", status);
      const result = await apiRequest<{ entries: ContentListItem[] }>(`/api/admin/content?${params}`);
      setEntries(result.entries);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить материалы");
    } finally {
      setIsLoading(false);
    }
  }, [kind, query, status]);

  useEffect(() => { void load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const archive = async (id: string, title: string) => {
    if (!window.confirm(`Переместить «${title}» в архив?`)) return;
    try {
      await apiRequest(`/api/admin/content/${id}`, { method: "DELETE" });
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось архивировать материал");
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Публикации</p><h1>Материалы</h1></div><Link className="admin-button admin-button--primary" href="/admin/content/new">Добавить материал</Link></header>
      <form className="admin-filters" onSubmit={(event) => { event.preventDefault(); void load(); }}>
        <label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название или slug" /></label>
        <label><span>Тип</span><select value={kind} onChange={(event) => setKind(event.target.value as ContentKind | "")}><option value="">Все</option><option value="ARTICLE">Статьи</option><option value="NEWS">Новости</option></select></label>
        <label><span>Статус</span><select value={status} onChange={(event) => setStatus(event.target.value as ContentStatus | "")}><option value="">Все</option><option value="DRAFT">Черновики</option><option value="PUBLISHED">Опубликованные</option><option value="ARCHIVED">Архив</option></select></label>
        <button className="admin-button" type="submit" disabled={isLoading}>Применить</button>
      </form>
      <AdminError>{error}</AdminError>
      {isLoading ? <AdminLoading /> : entries.length === 0 ? <p className="admin__empty">Материалы не найдены.</p> : (
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Название</th><th>Тип</th><th>Статус</th><th>Обновлён</th><th><span className="sr-only">Действия</span></th></tr></thead><tbody>
          {entries.map((entry) => <ContentRows key={entry.id} entry={entry} expanded={expanded === entry.id} onToggle={() => setExpanded(expanded === entry.id ? null : entry.id)} onArchive={() => void archive(entry.id, entry.title)} />)}
        </tbody></table></div>
      )}
    </div>
  );
}

function ContentRows({ entry, expanded, onToggle, onArchive }: { entry: ContentListItem; expanded: boolean; onToggle: () => void; onArchive: () => void }) {
  const publicPath = `/${entry.kind === "ARTICLE" ? "articles" : "news"}/${entry.slug}`;
  return (
    <>
      <tr>
        <td data-label="Название"><button type="button" className="admin-table__expand" aria-expanded={expanded} onClick={onToggle}>{entry.title}</button><small>{entry.slug}</small></td>
        <td data-label="Тип">{entry.kind === "ARTICLE" ? "Статья" : "Новость"}</td>
        <td data-label="Статус"><span className={`admin-status admin-status--${entry.status.toLowerCase()}`}>{contentStatusLabels[entry.status]}</span></td>
        <td data-label="Обновлён">{formatDate(entry.updatedAt)}</td>
        <td><Link className="admin-link" href={`/admin/content/${entry.id}`}>Редактировать</Link></td>
      </tr>
      {expanded && <tr className="admin-table__details"><td colSpan={5}><p>{entry.excerpt}</p><dl><div><dt>Автор</dt><dd>{entry.author.email}</dd></div><div><dt>Публикация</dt><dd>{formatDate(entry.publishedAt)}</dd></div></dl><div className="admin-actions"><Link href={`/admin/preview/${entry.id}`}>Предпросмотр</Link>{entry.status === "PUBLISHED" && <Link href={publicPath} target="_blank">Открыть на сайте</Link>}{entry.status !== "ARCHIVED" && <button type="button" onClick={onArchive}>В архив</button>}</div></td></tr>}
    </>
  );
}
