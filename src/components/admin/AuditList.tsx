"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, formatDate } from "./AdminStates";
import type { AuditItem } from "./types";

const actionLabels: Record<string, string> = {
  CONTENT_CREATED: "Создан материал",
  CONTENT_UPDATED: "Изменён материал",
  CONTENT_ARCHIVED: "Материал перемещён в архив",
  CONTENT_REVISION_RESTORED: "Восстановлена версия материала",
  PAGE_UPDATED: "Изменена страница",
  PAGE_REVISION_RESTORED: "Восстановлена версия страницы",
  SETTINGS_UPDATED: "Обновлены контакты",
  ORGANIZATION_UPDATED: "Обновлены данные организации",
  DOCTOR_CREATED: "Добавлен врач",
  DOCTOR_UPDATED: "Изменён врач",
  DOCTOR_DELETED: "Удалён врач",
  SERVICE_CREATED: "Добавлена услуга",
  SERVICE_UPDATED: "Изменена услуга",
  SERVICE_DELETED: "Удалена услуга",
  PROFILE_UPDATED: "Изменён профиль",
  VERIFICATION_SUBMITTED: "Подана заявка на верификацию",
  VERIFICATION_APPROVED: "Верификация подтверждена",
  VERIFICATION_REJECTED: "Верификация отклонена",
  USER_BLOCK: "Пользователь заблокирован",
  USER_UNBLOCK: "Пользователь разблокирован",
  USER_SET_ROLE: "Изменена роль пользователя",
};

const metadataLabels: Record<string, string> = {
  kind: "Тип", status: "Статус", slug: "Адрес страницы", restoreRevisionId: "Версия",
  role: "Роль", decision: "Решение", rejectionReason: "Причина",
};

function entityLink(log: AuditItem) {
  if (log.entityType === "ContentEntry") return `/admin/content/${log.entityId}`;
  if (log.entityType === "VerificationRequest") return `/admin/verifications/${log.entityId}`;
  if (log.entityType === "User") return `/admin/users/${log.entityId}`;
  if (log.entityType === "Page" && typeof log.metadata?.slug === "string") return `/admin/pages/${log.metadata.slug}`;
  if (log.entityType === "SiteSettings") return "/admin/settings";
  if (["OrganizationInfo", "Doctor", "MedicalService"].includes(log.entityType)) return "/admin/organization";
  return "";
}

export function AuditList() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ logs: AuditItem[]; pages: number }>(`/api/admin/audit?page=${page}`);
      setLogs(result.logs);
      setPages(result.pages);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить журнал");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Контроль изменений</p><h1>Журнал действий</h1><p className="admin__lead">Кто, когда и какой объект изменил. Технические данные скрыты в подробностях.</p></div></header>
      <AdminError>{error}</AdminError>
      {isLoading ? <AdminLoading /> : logs.length === 0 ? <p className="admin__empty">Событий пока нет.</p> : (
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Дата</th><th>Сотрудник</th><th>Действие</th><th>Объект</th><th>Данные</th></tr></thead><tbody>
          {logs.map((log) => {
            const href = entityLink(log);
            return <tr key={log.id}><td data-label="Дата">{formatDate(log.createdAt)}</td><td data-label="Сотрудник">{log.actor?.email || "Система"}</td><td data-label="Действие"><span className="admin-audit-action">{actionLabels[log.action] || log.action}</span></td><td data-label="Объект">{href ? <Link className="admin-link" href={href}>Открыть объект</Link> : log.entityType}<small>{log.entityType}</small></td><td data-label="Данные">{log.metadata ? <details><summary>Подробнее</summary><dl className="admin-metadata">{Object.entries(log.metadata).map(([key, value]) => <div key={key}><dt>{metadataLabels[key] || key}</dt><dd>{value === null || value === "" ? "—" : String(value)}</dd></div>)}</dl></details> : "—"}</td></tr>;
          })}
        </tbody></table></div>
      )}
      {pages > 1 && <nav className="admin-pagination" aria-label="Страницы журнала"><button type="button" className="admin-button" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>Назад</button><span>{page} / {pages}</span><button type="button" className="admin-button" disabled={page >= pages || isLoading} onClick={() => setPage((current) => current + 1)}>Вперёд</button></nav>}
    </div>
  );
}
