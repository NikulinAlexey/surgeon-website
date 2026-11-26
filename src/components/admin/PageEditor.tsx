"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, formatDate } from "./AdminStates";
import { RichTextEditor } from "./RichTextEditor";
import { UnsavedChangesGuard } from "./UnsavedChangesGuard";
import { ConfirmDialog } from "./ConfirmDialog";
import type { CmsPageItem, FaqItem } from "./types";

interface EditorData {
  title: string;
  subtitle: string;
  body: string;
  faq: FaqItem[];
  seoTitle: string;
  seoDescription: string;
}

const emptyData: EditorData = { title: "", subtitle: "", body: "<p></p>", faq: [], seoTitle: "", seoDescription: "" };

export function PageEditor({ slug }: { slug: string }) {
  const encodedSlug = slug.split("/").map(encodeURIComponent).join("/");
  const [page, setPage] = useState<CmsPageItem | null>(null);
  const [data, setData] = useState<EditorData>(emptyData);
  const [savedData, setSavedData] = useState<EditorData>(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingRevision, setPendingRevision] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("");
  const isDirty = JSON.stringify(data) !== JSON.stringify(savedData);

  const applyPage = useCallback((item: CmsPageItem) => {
    const next: EditorData = {
      title: item.title, subtitle: item.subtitle, body: item.body || "<p></p>",
      faq: item.faq, seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "",
    };
    setPage(item);
    setData(next);
    setSavedData(next);
    setLastSavedAt(item.updatedAt);
  }, []);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ page: CmsPageItem }>(`/api/admin/pages/${encodedSlug}`);
      applyPage(result.page);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить страницу");
    } finally {
      setIsLoading(false);
    }
  }, [encodedSlug, applyPage]);

  useEffect(() => { void load(); }, [load]);

  const update = <K extends keyof EditorData>(key: K, value: EditorData[K]) => {
    if (data[key] === value) return;
    setData((current) => ({ ...current, [key]: value }));
    setMessage("");
  };

  const updateFaq = (id: string, key: "question" | "answer", value: string) => {
    update("faq", data.faq.map((item) => item.id === id ? { ...item, [key]: value } : item));
  };

  const save = async (event?: React.FormEvent, restoreRevisionId?: string) => {
    event?.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      await apiRequest(`/api/admin/pages/${encodedSlug}`, { method: "PUT", body: JSON.stringify({ ...data, restoreRevisionId }) });
      setMessage(restoreRevisionId ? "Версия страницы восстановлена" : "Страница сохранена");
      setPendingRevision("");
      await load();
    } catch (reason) {
      if (reason instanceof ApiRequestError && reason.fields) setFieldErrors(reason.fields);
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить страницу");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLoading />;

  return (
    <div className="admin-page admin-page--editor">
      <UnsavedChangesGuard isDirty={isDirty && !isSaving} />
      <header className="admin-page__header admin-page__header--sticky">
        <div>
          <Link href="/admin/pages" className="admin__back">← Все страницы</Link>
          <h1>{page?.title || slug}</h1>
          <p className="admin__muted">{slug}</p>
        </div>
        <div className="admin-page__header-actions">
          <span className={`admin__save-state ${isDirty ? "admin__save-state--dirty" : ""}`}>{isDirty ? "Не сохранено" : `Сохранено: ${formatDate(lastSavedAt)}`}</span>
          <Link className="admin-button" href={slug === "home" ? "/" : `/${slug}`} target="_blank">На сайте</Link>
        </div>
      </header>
      <AdminError>{error}</AdminError>
      <AdminSuccess>{message}</AdminSuccess>
      <form className="admin-editor admin-editor-layout" onSubmit={(event) => void save(event)}>
        <div className="admin-editor__main">
          <section className="admin-section">
            <h2>Заголовки и текст</h2>
            <div className="admin-form-grid">
              <label className="admin-form-grid__wide"><span>Заголовок страницы</span><input value={data.title} onChange={(event) => update("title", event.target.value)} required disabled={isSaving} />{fieldErrors.title && <small className="admin-field-error">{fieldErrors.title}</small>}</label>
              <label className="admin-form-grid__wide"><span>Подзаголовок</span><textarea rows={3} value={data.subtitle} onChange={(event) => update("subtitle", event.target.value)} disabled={isSaving} /></label>
            </div>
            <RichTextEditor value={data.body} onChange={(value) => update("body", value)} disabled={isSaving} label="Основной текст страницы" />
          </section>
          <section className="admin-section">
            <div className="admin-section__header"><h2>Часто задаваемые вопросы</h2><button className="admin-button" type="button" onClick={() => update("faq", [...data.faq, { id: crypto.randomUUID(), question: "", answer: "" }])} disabled={isSaving}>Добавить вопрос</button></div>
            {data.faq.length === 0 && <p className="admin__empty">Вопросы не добавлены. Блок FAQ не будет показан на странице.</p>}
            <div className="admin-faq-editor">
              {data.faq.map((item, index) => (
                <fieldset key={item.id} disabled={isSaving}>
                  <legend>Вопрос {index + 1}</legend>
                  <label><span>Заголовок</span><input value={item.question} onChange={(event) => updateFaq(item.id, "question", event.target.value)} required /></label>
                  <label><span>Ответ</span><textarea rows={4} value={item.answer} onChange={(event) => updateFaq(item.id, "answer", event.target.value)} required /></label>
                  <button type="button" className="admin-link admin-link--danger" onClick={() => update("faq", data.faq.filter((faq) => faq.id !== item.id))}>Удалить вопрос</button>
                </fieldset>
              ))}
            </div>
          </section>
        </div>
        <aside className="admin-editor__aside">
          <section className="admin-section">
            <h2>Поисковое описание</h2>
            <div className="admin-form-grid admin-form-grid--single">
              <label><span>SEO-заголовок</span><input value={data.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} disabled={isSaving} maxLength={220} /><small>{data.seoTitle.length} / 220</small></label>
              <label><span>SEO-описание</span><textarea rows={5} value={data.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} disabled={isSaving} maxLength={500} /><small>{data.seoDescription.length} / 500</small></label>
            </div>
          </section>
        </aside>
        <div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving || !isDirty}>{isSaving ? "Сохранение…" : "Сохранить страницу"}</button></div>
      </form>
      {page?.revisions.length ? <section className="admin-section admin-revisions"><h2>История версий</h2>{page.revisions.map((revision) => <article key={revision.id}><div><strong>{revision.title}</strong><p>{formatDate(revision.createdAt)} · {revision.editor.email}</p></div><button className="admin-button" type="button" onClick={() => setPendingRevision(revision.id)} disabled={isSaving}>Восстановить</button></article>)}</section> : null}
      <ConfirmDialog isOpen={Boolean(pendingRevision)} title="Восстановить версию страницы?" description="Текущее содержимое будет сохранено в истории как отдельная версия." confirmLabel="Восстановить" isLoading={isSaving} onClose={() => setPendingRevision("")} onConfirm={() => void save(undefined, pendingRevision)} />
    </div>
  );
}
