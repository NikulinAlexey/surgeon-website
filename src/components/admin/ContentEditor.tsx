"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, formatDate } from "./AdminStates";
import { RichTextEditor } from "./RichTextEditor";
import type { ContentItem, ContentKind, ContentStatus } from "./types";

interface EditorData {
  kind: ContentKind;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: ContentStatus;
  publishedAt: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
}

const emptyData: EditorData = {
  kind: "ARTICLE", slug: "", title: "", excerpt: "", body: "<p></p>",
  status: "DRAFT", publishedAt: "", coverAlt: "", seoTitle: "", seoDescription: "",
};

function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

export function ContentEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [data, setData] = useState<EditorData>(emptyData);
  const [entry, setEntry] = useState<ContentItem | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [removeCover, setRemoveCover] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const applyEntry = useCallback((item: ContentItem) => {
    setEntry(item);
    setData({
      kind: item.kind, slug: item.slug, title: item.title, excerpt: item.excerpt,
      body: item.body, status: item.status, publishedAt: toLocalInput(item.publishedAt),
      coverAlt: item.coverAlt || "", seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "",
    });
  }, []);

  const load = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ entry: ContentItem }>(`/api/admin/content/${id}`);
      applyEntry(result.entry);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить материал");
    } finally {
      setIsLoading(false);
    }
  }, [applyEntry, id]);
  useEffect(() => { void load(); }, [load]);

  const update = <K extends keyof EditorData>(key: K, value: EditorData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
  };

  const save = async (event?: React.FormEvent, restoreRevisionId = "") => {
    event?.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    setFieldErrors({});
    try {
      const form = new FormData();
      form.set("payload", JSON.stringify({ ...data, publishedAt: data.publishedAt || null }));
      if (cover) form.set("cover", cover);
      if (restoreRevisionId) form.set("restoreRevisionId", restoreRevisionId);
      if (id) form.set("removeCover", String(removeCover));
      if (id) {
        await apiRequest(`/api/admin/content/${id}`, { method: "PATCH", body: form });
        setCover(null);
        setRemoveCover(false);
        setMessage(restoreRevisionId ? "Версия восстановлена" : "Материал сохранён");
        await load();
      } else {
        const result = await apiRequest<{ id: string }>("/api/admin/content", { method: "POST", body: form });
        router.replace(`/admin/content/${result.id}`);
      }
    } catch (reason) {
      if (reason instanceof ApiRequestError) setFieldErrors(reason.fields || {});
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить материал");
    } finally {
      setIsSaving(false);
    }
  };

  const archive = async () => {
    if (!id || !window.confirm("Переместить материал в архив?")) return;
    setError("");
    try {
      await apiRequest(`/api/admin/content/${id}`, { method: "DELETE" });
      router.push("/admin/content");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось архивировать материал");
    }
  };

  if (isLoading) return <AdminLoading />;
  return (
    <div className="admin-page admin-page--editor">
      <header className="admin-page__header"><div><Link href="/admin/content" className="admin__back">← Все материалы</Link><h1>{id ? "Редактирование материала" : "Новый материал"}</h1></div>{id && <Link className="admin-button" href={`/admin/preview/${id}`}>Предпросмотр</Link>}</header>
      <AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess>
      <form onSubmit={(event) => void save(event)} className="admin-editor">
        <section className="admin-section">
          <h2>Основные сведения</h2>
          <div className="admin-form-grid">
            <label><span>Тип</span><select value={data.kind} onChange={(event) => update("kind", event.target.value as ContentKind)} disabled={isSaving}><option value="ARTICLE">Статья</option><option value="NEWS">Новость</option></select></label>
            <label><span>Статус</span><select value={data.status} onChange={(event) => update("status", event.target.value as ContentStatus)} disabled={isSaving}><option value="DRAFT">Черновик</option><option value="PUBLISHED">Опубликован</option><option value="ARCHIVED">Архив</option></select></label>
            <label className="admin-form-grid__wide"><span>Заголовок</span><input value={data.title} onChange={(event) => update("title", event.target.value)} disabled={isSaving} required />{fieldErrors.title && <small className="admin-field-error">{fieldErrors.title}</small>}</label>
            <label className="admin-form-grid__wide"><span>Slug (латиница, цифры, дефисы)</span><input value={data.slug} onChange={(event) => update("slug", event.target.value)} disabled={isSaving} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required />{fieldErrors.slug && <small className="admin-field-error">{fieldErrors.slug}</small>}</label>
            <label className="admin-form-grid__wide"><span>Краткое описание</span><textarea value={data.excerpt} onChange={(event) => update("excerpt", event.target.value)} disabled={isSaving} rows={4} required />{fieldErrors.excerpt && <small className="admin-field-error">{fieldErrors.excerpt}</small>}</label>
            <label><span>Дата и время публикации</span><input type="datetime-local" value={data.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} disabled={isSaving || data.status !== "PUBLISHED"}/><small>Если не указана, используется текущее время. Будущая дата откладывает показ.</small></label>
          </div>
        </section>
        <section className="admin-section"><h2>Содержимое</h2><RichTextEditor value={data.body} onChange={(value) => update("body", value)} disabled={isSaving} />{fieldErrors.body && <small className="admin-field-error">{fieldErrors.body}</small>}</section>
        <section className="admin-section"><h2>Обложка</h2><div className="admin-form-grid">
          {entry?.coverMedia && !removeCover && <div className="admin-cover"><Image src={`/api/media/${entry.coverMedia.id}`} alt={data.coverAlt || "Текущая обложка"} width={640} height={360} /></div>}
          <label><span>Новое изображение (JPEG, PNG или WebP, до 8 МБ)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCover(event.target.files?.[0] || null)} disabled={isSaving} /></label>
          <label className="admin-form-grid__wide"><span>Описание обложки для скринридеров</span><input value={data.coverAlt} onChange={(event) => update("coverAlt", event.target.value)} disabled={isSaving} /></label>
          {entry?.coverMedia && <label className="admin-check"><input type="checkbox" checked={removeCover} onChange={(event) => setRemoveCover(event.target.checked)} disabled={isSaving} />Удалить текущую обложку после сохранения</label>}
        </div></section>
        <section className="admin-section"><h2>Поисковое описание</h2><div className="admin-form-grid">
          <label className="admin-form-grid__wide"><span>SEO-заголовок</span><input value={data.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} disabled={isSaving} /></label>
          <label className="admin-form-grid__wide"><span>SEO-описание</span><textarea rows={3} value={data.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} disabled={isSaving} /></label>
        </div></section>
        <div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : id ? "Сохранить изменения" : "Создать материал"}</button>{id && data.status !== "ARCHIVED" && <button className="admin-button admin-button--danger" type="button" onClick={() => void archive()} disabled={isSaving}>В архив</button>}</div>
      </form>
      {entry?.revisions.length ? <section className="admin-section"><h2>История версий</h2><div className="admin-revisions">{entry.revisions.map((revision) => <article key={revision.id}><div><strong>{revision.title}</strong><p>{formatDate(revision.createdAt)} · {revision.editor.email}</p></div><button type="button" className="admin-button" onClick={() => { if (window.confirm("Восстановить эту версию? Текущий текст будет сохранён как отдельная версия.")) void save(undefined, revision.id); }} disabled={isSaving}>Восстановить</button></article>)}</div></section> : null}
    </div>
  );
}
