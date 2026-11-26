"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, formatDate, verificationLabels } from "./AdminStates";
import { ConfirmDialog } from "./ConfirmDialog";
import type { VerificationRequestItem } from "./types";

export function VerificationDetail({ id }: { id: string }) {
  const [request, setRequest] = useState<VerificationRequestItem | null>(null);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ verification: VerificationRequestItem }>(`/api/admin/verifications/${id}`);
      setRequest(result.verification);
    } catch (reasonValue) {
      setError(reasonValue instanceof Error ? reasonValue.message : "Не удалось загрузить заявку");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { void load(); }, [load]);

  const decide = async (decision: "APPROVED" | "REJECTED") => {
    if (decision === "REJECTED" && reason.trim().length < 5) {
      setError("Укажите причину отклонения (минимум 5 символов)");
      return;
    }
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      await apiRequest(`/api/admin/verifications/${id}`, { method: "PATCH", body: JSON.stringify({ decision, rejectionReason: decision === "REJECTED" ? reason : "" }) });
      setMessage(decision === "APPROVED" ? "Заявка подтверждена, пользователю отправлено письмо" : "Заявка отклонена, пользователю отправлено письмо");
      setApproveOpen(false);
      await load();
    } catch (reasonValue) {
      setError(reasonValue instanceof Error ? reasonValue.message : "Не удалось сохранить решение");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLoading />;
  if (!request) return <AdminError>{error || "Заявка не найдена"}</AdminError>;
  const user = request.user;

  return (
    <div className="admin-page">
      <header className="admin-page__header admin-page__header--sticky"><div><Link href="/admin/verifications" className="admin__back">← Все заявки</Link><h1>Заявка от {formatDate(request.submittedAt)}</h1></div><span className={`admin-status admin-status--${request.status.toLowerCase()}`}>{verificationLabels[request.status]}</span></header>
      <AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess>
      <div className="admin-verification-layout">
        <div>
          <section className="admin-section"><div className="admin-section__header"><h2>{user?.lastName} {user?.firstName} {user?.patronymic || ""}</h2>{user && <Link className="admin-link" href={`/admin/users/${user.id}`}>Карточка пользователя</Link>}</div><dl className="admin-definition-list"><div><dt>Email</dt><dd>{user?.email}</dd></div><div><dt>Телефон</dt><dd>{user?.phone || "—"}</dd></div><div><dt>Специализация</dt><dd>{user?.specialistProfile?.specialization || "—"}</dd></div><div><dt>Опыт</dt><dd>{user?.specialistProfile?.experience ?? "—"} лет</dd></div></dl>{user?.specialistProfile?.description && <p className="admin__prewrap">{user.specialistProfile.description}</p>}</section>
          <section className="admin-section"><h2>Документы</h2><p className="admin__lead">Файлы доступны только администраторам и не попадают в публичный каталог.</p><ul className="admin-documents">{request.documents.map((document) => <li key={document.id}><a href={`/api/admin/documents/${document.id}`} target="_blank" rel="noopener noreferrer">{document.originalName || "Документ"}</a><span>{document.mimeType}{document.size ? ` · ${Math.ceil(document.size / 1024)} КБ` : ""}</span></li>)}</ul></section>
        </div>
        {request.status === "PENDING" ? <section className="admin-section admin-decision"><h2>Решение</h2><label><span>Причина отклонения (обязательна при отказе)</span><textarea rows={5} value={reason} onChange={(event) => setReason(event.target.value)} disabled={isSaving} /></label><div className="admin-submit-bar"><button type="button" className="admin-button admin-button--primary" onClick={() => setApproveOpen(true)} disabled={isSaving}>Подтвердить специалиста</button><button type="button" className="admin-button admin-button--danger" onClick={() => void decide("REJECTED")} disabled={isSaving}>Отклонить заявку</button></div></section> : <section className="admin-section admin-decision"><h2>Итог проверки</h2><p>Проверена: {formatDate(request.reviewedAt)}{request.reviewer ? ` · ${request.reviewer.email}` : ""}</p>{request.rejectionReason && <p className="admin__prewrap">{request.rejectionReason}</p>}</section>}
      </div>
      <ConfirmDialog isOpen={approveOpen} title="Подтвердить профессиональный статус?" description="Пользователь получит статус специалиста и письмо с результатом проверки." confirmLabel="Подтвердить" isLoading={isSaving} onClose={() => setApproveOpen(false)} onConfirm={() => void decide("APPROVED")} />
    </div>
  );
}
