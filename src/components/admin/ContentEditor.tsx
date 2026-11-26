"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, contentStatusLabels, formatDate } from "./AdminStates";
import { RichTextEditor } from "./RichTextEditor";
import { ConfirmDialog } from "./ConfirmDialog";
import { UnsavedChangesGuard } from "./UnsavedChangesGuard";
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

function slugify(value: string) {
  const letters: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return value.toLowerCase().split("").map((letter) => letters[letter] ?? letter).join("")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180);
}

export function ContentEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [data, setData] = useState<EditorData>(emptyData);
  const [savedData, setSavedData] = useState<EditorData>(emptyData);
  const [entry, setEntry] = useState<ContentItem | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [removeCover, setRemoveCover] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSaving, setIsSaving] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [pendingRevision, setPendingRevision] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("");
  const isDirty = JSON.stringify(data) !== JSON.stringify(savedData) || Boolean(cover) || removeCover;

  const applyEntry = useCallback((item: ContentItem) => {
    const next: EditorData = {
      kind: item.kind, slug: item.slug, title: item.title, excerpt: item.excerpt,
      body: item.body, status: item.status, publishedAt: toLocalInput(item.publishedAt),
      coverAlt: item.coverAlt || "", seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "",
    };
    setEntry(item);
    setData(next);
    setSavedData(next);
    setLastSavedAt(item.updatedAt);
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
  }, [id, applyEntry]);

  useEffect(() => { void load(); }, [load]);

  const update = <K extends keyof EditorData>(key: K, value: EditorData[K]) => {
    if (data[key] === value) return;
    setData((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
    setMessage("");
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
        setMessage("Материал сохранён");
        await load();
      } else {
        const result = await apiRequest<{ id: string }>("/api/admin/content", { method: "POST", body: form });
        setSavedData(data);
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
    if (!id) return;
    setIsArchiving(true);
    try {
      await apiRequest(`/api/admin/content/${id}`, { method: "DELETE" });
      setArchiveOpen(false);
      router.push("/admin/content");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось архивировать материал");
    } finally {
      setIsArchiving(false);
    }
  };

  if (isLoading) return <AdminLoading />;

  return (
    <div className="admin-page admin-page--editor">
      <UnsavedChangesGuard isDirty={isDirty && !isSaving} />
      <header className="admin-page__header admin-page__header--sticky">
        <div>
          <Link href="/admin/content" className="admin__back">← Все материалы</Link>
          <h1>{id ? "Редактирование материала" : "Новый материал"}</h1>
          <p className={`admin__save-state ${isDirty ? "admin__save-state--dirty" : ""}`}>
            {isDirty ? "Есть несохранённые изменения" : lastSavedAt ? `Сохранено: ${formatDate(lastSavedAt)}` : "Черновик ещё не создан"}
          </p>
        </div>
        <div className="admin-page__header-actions">
          {id && <span className={`admin-status admin-status--${data.status.toLowerCase()}`}>{contentStatusLabels[data.status]}</span>}
          {id && <Link className="admin-button" href={`/admin/preview/${id}`} target="_blank">Предпросмотр</Link>}
        </div>
      </header>
      <AdminError>{error}</AdminError>
      <AdminSuccess>{message}</AdminSuccess>
      <form onSubmit={(event) => void save(event)} className="admin-editor admin-editor-layout">
        <div className="admin-editor__main">
          <section className="admin-section">
            <h2>Основное содержимое</h2>
            <div className="admin-form-grid">
              <label className="admin-form-grid__wide"><span>Заголовок</span><input value={data.title} onChange={(event) => {
                const title = event.target.value;
                setData((current) => ({ ...current, title, slug: !id && !slugTouched ? slugify(title) : current.slug }));
                setMessage("");
              }} disabled={isSaving} required />{fieldErrors.title && <small className="admin-field-error">{fieldErrors.title}</small>}</label>
              <label className="admin-form-grid__wide"><span>Краткое описание</span><textarea value={data.excerpt} onChange={(event) => update("excerpt", event.target.value)} disabled={isSaving} rows={5} required />{fieldErrors.excerpt && <small className="admin-field-error">{fieldErrors.excerpt}</small>}</label>
            </div>
          </section>
          <section className="admin-section admin-section--editor">
            <h2>Текст материала</h2>
            <RichTextEditor value={data.body} onChange={(value) => update("body", value)} disabled={isSaving} />
            {fieldErrors.body && <small className="admin-field-error">{fieldErrors.body}</small>}
          </section>
        </div>

        <aside className="admin-editor__aside">
          <section className="admin-section">
            <h2>Публикация</h2>
            <div className="admin-form-grid admin-form-grid--single">
              <label><span>Тип</span><select value={data.kind} onChange={(event) => update("kind", event.target.value as ContentKind)} disabled={isSaving}><option value="ARTICLE">Статья</option><option value="NEWS">Новость</option></select></label>
              <label><span>Статус</span><select value={data.status} onChange={(event) => update("status", event.target.value as ContentStatus)} disabled={isSaving}><option value="DRAFT">Черновик</option><option value="PUBLISHED">Опубликован</option><option value="ARCHIVED">Архив</option></select></label>
              <label><span>Slug (латиница, цифры, дефисы)</span><input value={data.slug} onChange={(event) => { setSlugTouched(true); update("slug", event.target.value); }} disabled={isSaving} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required />{fieldErrors.slug && <small className="admin-field-error">{fieldErrors.slug}</small>}</label>
              <label><span>Дата и время публикации</span><input type="datetime-local" value={data.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} disabled={isSaving || data.status !== "PUBLISHED"} /><small>Для публикации без даты используется текущее время.</small></label>
            </div>
          </section>
          <section className="admin-section">
            <h2>Обложка</h2>
            <div className="admin-form-grid admin-form-grid--single">
              {entry?.coverMedia && !removeCover && <Image className="admin-cover" src={`/api/media/${entry.coverMedia.id}`} alt={data.coverAlt || "Текущая обложка"} width={640} height={360} />}
              <label><span>Новое изображение (JPEG, PNG или WebP, до 8 МБ)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCover(event.target.files?.[0] || null)} disabled={isSaving} /></label>
              <label><span>Описание обложки для скринридера</span><input value={data.coverAlt} onChange={(event) => update("coverAlt", event.target.value)} disabled={isSaving} /></label>
              {entry?.coverMedia && <label className="admin-check"><input type="checkbox" checked={removeCover} onChange={(event) => setRemoveCover(event.target.checked)} disabled={isSaving} /><span>Удалить текущую обложку после сохранения</span></label>}
            </div>
          </section>
          <section className="admin-section">
            <h2>Поисковое описание</h2>
            <div className="admin-form-grid admin-form-grid--single">
              <label><span>SEO-заголовок</span><input value={data.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} disabled={isSaving} maxLength={220} /><small>{data.seoTitle.length} / 220</small></label>
              <label><span>SEO-описание</span><textarea rows={5} value={data.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} disabled={isSaving} maxLength={500} /><small>{data.seoDescription.length} / 500</small></label>
            </div>
          </section>
        </aside>

        <div className="admin-submit-bar">
          <button className="admin-button admin-button--primary" type="submit" disabled={isSaving || !isDirty}>{isSaving ? "Сохранение…" : id ? "Сохранить изменения" : "Создать материал"}</button>
          {id && data.status !== "ARCHIVED" && <button className="admin-button admin-button--danger" type="button" onClick={() => setArchiveOpen(true)} disabled={isSaving}>В архив</button>}
        </div>
      </form>
      {entry?.revisions.length ? <section className="admin-section admin-revisions"><h2>История версий</h2>{entry.revisions.map((revision) => <article key={revision.id}><div><strong>{revision.title}</strong><p>{formatDate(revision.createdAt)} · {revision.editor.email}</p></div><button className="admin-button" type="button" onClick={() => setPendingRevision(revision.id)} disabled={isSaving}>Восстановить</button></article>)}</section> : null}
      <ConfirmDialog isOpen={archiveOpen} title="Переместить материал в архив?" description="Материал исчезнет с публичного сайта, но останется доступен в админке." confirmLabel="В архив" danger isLoading={isArchiving} onClose={() => setArchiveOpen(false)} onConfirm={() => void archive()} />
      <ConfirmDialog isOpen={Boolean(pendingRevision)} title="Восстановить версию материала?" description="Текущее содержимое будет сохранено в истории как отдельная версия." confirmLabel="Восстановить" isLoading={isSaving} onClose={() => setPendingRevision("")} onConfirm={() => { const revision = pendingRevision; setPendingRevision(""); void save(undefined, revision); }} />
    </div>
  );
}
