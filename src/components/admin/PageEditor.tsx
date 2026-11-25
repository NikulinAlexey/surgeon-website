"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, formatDate } from "./AdminStates";
import { RichTextEditor } from "./RichTextEditor";
import type { CmsPageItem, FaqItem } from "./types";

interface EditorData {
  title: string;
  subtitle: string;
  body: string;
  faq: FaqItem[];
  seoTitle: string;
  seoDescription: string;
}

export function PageEditor({ slug }: { slug: string }) {
  const encodedSlug = slug.split("/").map(encodeURIComponent).join("/");
  const [page, setPage] = useState<CmsPageItem | null>(null);
  const [data, setData] = useState<EditorData>({ title: "", subtitle: "", body: "<p></p>", faq: [], seoTitle: "", seoDescription: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const applyPage = useCallback((item: CmsPageItem) => {
    setPage(item);
    setData({ title: item.title, subtitle: item.subtitle, body: item.body || "<p></p>", faq: item.faq, seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "" });
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
  }, [applyPage, encodedSlug]);
  useEffect(() => { void load(); }, [load]);

  const updateFaq = (id: string, key: "question" | "answer", value: string) => {
    setData((current) => ({ ...current, faq: current.faq.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  };
  const save = async (event?: React.FormEvent, restoreRevisionId?: string) => {
    event?.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      await apiRequest(`/api/admin/pages/${encodedSlug}`, { method: "PUT", body: JSON.stringify({ ...data, restoreRevisionId }) });
      setMessage(restoreRevisionId ? "Версия страницы восстановлена" : "Страница сохранена");
      await load();
    } catch (reason) {
      if (reason instanceof ApiRequestError && reason.fields) {
        const details = Object.values(reason.fields).join("; ");
        setError(`${reason.message}${details ? `: ${details}` : ""}`);
      } else setError(reason instanceof Error ? reason.message : "Не удалось сохранить страницу");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLoading />;
  return (
    <div className="admin-page admin-page--editor">
      <header className="admin-page__header"><div><Link href="/admin/pages" className="admin__back">← Все страницы</Link><h1>{page?.title || slug}</h1><p className="admin__muted">{slug}</p></div><Link className="admin-button" href={slug === "home" ? "/" : `/${slug}`} target="_blank">Открыть на сайте</Link></header>
      <AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess>
      <form className="admin-editor" onSubmit={(event) => void save(event)}>
        <section className="admin-section"><h2>Заголовки и текст</h2><div className="admin-form-grid">
          <label className="admin-form-grid__wide"><span>Заголовок страницы</span><input value={data.title} onChange={(event) => setData({ ...data, title: event.target.value })} required disabled={isSaving} /></label>
          <label className="admin-form-grid__wide"><span>Подзаголовок</span><textarea rows={3} value={data.subtitle} onChange={(event) => setData({ ...data, subtitle: event.target.value })} disabled={isSaving} /></label>
        </div><RichTextEditor value={data.body} onChange={(body) => setData((current) => ({ ...current, body }))} disabled={isSaving} label="Основной текст страницы" /></section>
        <section className="admin-section"><div className="admin-section__header"><h2>Часто задаваемые вопросы</h2><button type="button" className="admin-button" onClick={() => setData((current) => ({ ...current, faq: [...current.faq, { id: crypto.randomUUID(), question: "", answer: "" }] }))} disabled={isSaving}>Добавить вопрос</button></div>
          {data.faq.length === 0 && <p className="admin__empty">На странице нет блока вопросов.</p>}
          <div className="admin-faq-editor">{data.faq.map((item, index) => <fieldset key={item.id}><legend>Вопрос {index + 1}</legend><label><span>Вопрос</span><input value={item.question} onChange={(event) => updateFaq(item.id, "question", event.target.value)} required disabled={isSaving} /></label><label><span>Ответ</span><textarea rows={4} value={item.answer} onChange={(event) => updateFaq(item.id, "answer", event.target.value)} required disabled={isSaving} /></label><button type="button" className="admin-link admin-link--danger" onClick={() => setData((current) => ({ ...current, faq: current.faq.filter((faq) => faq.id !== item.id) }))} disabled={isSaving}>Удалить вопрос</button></fieldset>)}</div>
        </section>
        <section className="admin-section"><h2>Поисковое описание</h2><div className="admin-form-grid"><label className="admin-form-grid__wide"><span>SEO-заголовок</span><input value={data.seoTitle} onChange={(event) => setData({ ...data, seoTitle: event.target.value })} disabled={isSaving} /></label><label className="admin-form-grid__wide"><span>SEO-описание</span><textarea rows={3} value={data.seoDescription} onChange={(event) => setData({ ...data, seoDescription: event.target.value })} disabled={isSaving} /></label></div></section>
        <div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : "Сохранить страницу"}</button></div>
      </form>
      {page?.revisions.length ? <section className="admin-section"><h2>История версий</h2><div className="admin-revisions">{page.revisions.map((revision) => <article key={revision.id}><div><strong>{revision.title}</strong><p>{formatDate(revision.createdAt)} · {revision.editor.email}</p></div><button type="button" className="admin-button" onClick={() => { if (window.confirm("Восстановить эту версию страницы?")) void save(undefined, revision.id); }} disabled={isSaving}>Восстановить</button></article>)}</div></section> : null}
    </div>
  );
}
