"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, formatDate } from "./AdminStates";
import type { AuditItem } from "./types";

export function AuditList() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setIsLoading(true); setError("");
    try { const result = await apiRequest<{ logs: AuditItem[]; pages: number }>(`/api/admin/audit?page=${page}`); setLogs(result.logs); setPages(result.pages); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Не удалось загрузить журнал"); }
    finally { setIsLoading(false); }
  }, [page]);
  useEffect(() => { void load(); }, [load]);
  return <div className="admin-page"><header className="admin-page__header"><div><p className="admin__eyebrow">Контроль изменений</p><h1>Журнал действий</h1></div></header><AdminError>{error}</AdminError>{isLoading ? <AdminLoading /> : logs.length === 0 ? <p className="admin__empty">Событий пока нет.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Дата</th><th>Сотрудник</th><th>Действие</th><th>Объект</th><th>Данные</th></tr></thead><tbody>{logs.map((log) => <tr key={log.id}><td data-label="Дата">{formatDate(log.createdAt)}</td><td data-label="Сотрудник">{log.actor?.email || "Система"}</td><td data-label="Действие"><code>{log.action}</code></td><td data-label="Объект">{log.entityType}<small>{log.entityId}</small></td><td data-label="Данные">{log.metadata ? <details><summary>Подробнее</summary><pre>{JSON.stringify(log.metadata, null, 2)}</pre></details> : "—"}</td></tr>)}</tbody></table></div>}{pages > 1 && <nav className="admin-pagination"><button className="admin-button" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>Назад</button><span>{page} / {pages}</span><button className="admin-button" disabled={page >= pages || isLoading} onClick={() => setPage((current) => current + 1)}>Вперёд</button></nav>}</div>;
}
