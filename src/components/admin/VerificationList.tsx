"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, formatDate, verificationLabels } from "./AdminStates";
import type { VerificationRequestItem } from "./types";
import type { VerificationStatus } from "@/types/user";

export function VerificationList() {
  const [status, setStatus] = useState<VerificationStatus | "">("PENDING");
  const [requests, setRequests] = useState<VerificationRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setIsLoading(true); setError("");
    try {
      const result = await apiRequest<{ requests: VerificationRequestItem[] }>(`/api/admin/verifications?status=${status}`);
      setRequests(result.requests);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Не удалось загрузить заявки"); }
    finally { setIsLoading(false); }
  }, [status]);
  useEffect(() => { void load(); }, [load]);
  return <div className="admin-page"><header className="admin-page__header"><div><p className="admin__eyebrow">Профессиональный статус</p><h1>Верификация специалистов</h1></div></header>
    <div className="admin-filters"><label><span>Статус заявок</span><select value={status} onChange={(event) => setStatus(event.target.value as VerificationStatus | "")}><option value="PENDING">На проверке</option><option value="APPROVED">Подтверждённые</option><option value="REJECTED">Отклонённые</option><option value="">Все</option></select></label></div>
    <AdminError>{error}</AdminError>{isLoading ? <AdminLoading /> : requests.length === 0 ? <p className="admin__empty">Заявок с выбранным статусом нет.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Специалист</th><th>Подана</th><th>Документы</th><th>Статус</th><th><span className="sr-only">Действия</span></th></tr></thead><tbody>{requests.map((request) => <tr key={request.id}><td data-label="Специалист"><strong>{request.user?.lastName} {request.user?.firstName} {request.user?.patronymic || ""}</strong><small>{request.user?.email}</small></td><td data-label="Подана">{formatDate(request.submittedAt)}</td><td data-label="Документы">{request.documents.length}</td><td data-label="Статус"><span className={`admin-status admin-status--${request.status.toLowerCase()}`}>{verificationLabels[request.status]}</span></td><td><Link className="admin-link" href={`/admin/verifications/${request.id}`}>Проверить</Link></td></tr>)}</tbody></table></div>}
  </div>;
}
