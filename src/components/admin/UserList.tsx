"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, formatDate, roleLabels } from "./AdminStates";
import type { AdminUserItem } from "./types";
import type { ClientUserRole } from "@/types/user";

export function UserList() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<ClientUserRole | "">("");
  const [status, setStatus] = useState<"ACTIVE" | "BLOCKED" | "">("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setIsLoading(true); setError("");
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (query) params.set("query", query); if (role) params.set("role", role); if (status) params.set("status", status);
      const result = await apiRequest<{ users: AdminUserItem[]; pages: number; total: number }>(`/api/admin/users?${params}`);
      setUsers(result.users); setPages(result.pages); setTotal(result.total);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Не удалось загрузить пользователей"); }
    finally { setIsLoading(false); }
  }, [page, query, role, status]);
  useEffect(() => { void load(); }, [page, role, status]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className="admin-page"><header className="admin-page__header"><div><p className="admin__eyebrow">Доступ и роли</p><h1>Пользователи</h1><p className="admin__muted">Всего: {total}</p></div></header>
    <form className="admin-filters" onSubmit={(event) => { event.preventDefault(); setPage(1); void load(); }}><label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Имя, email или телефон" /></label><label><span>Роль</span><select value={role} onChange={(event) => { setRole(event.target.value as ClientUserRole | ""); setPage(1); }}><option value="">Все роли</option>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label><span>Статус</span><select value={status} onChange={(event) => { setStatus(event.target.value as "ACTIVE" | "BLOCKED" | ""); setPage(1); }}><option value="">Все</option><option value="ACTIVE">Активные</option><option value="BLOCKED">Заблокированные</option></select></label><button className="admin-button" type="submit" disabled={isLoading}>Найти</button></form>
    <AdminError>{error}</AdminError>{isLoading ? <AdminLoading /> : users.length === 0 ? <p className="admin__empty">Пользователи не найдены.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Пользователь</th><th>Роль</th><th>Email</th><th>Регистрация</th><th>Статус</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td data-label="Пользователь"><Link className="admin-link" href={`/admin/users/${user.id}`}>{user.lastName} {user.firstName}</Link><small>{user.phone || "Телефон не указан"}</small></td><td data-label="Роль">{roleLabels[user.role]}</td><td data-label="Email">{user.email}<small>{user.emailVerifiedAt ? "Подтверждён" : "Не подтверждён"}</small></td><td data-label="Регистрация">{formatDate(user.createdAt)}</td><td data-label="Статус"><span className={`admin-status admin-status--${user.status.toLowerCase()}`}>{user.status === "ACTIVE" ? "Активен" : "Заблокирован"}</span></td></tr>)}</tbody></table></div>}
    {pages > 1 && <nav className="admin-pagination" aria-label="Страницы пользователей"><button className="admin-button" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>Назад</button><span>{page} / {pages}</span><button className="admin-button" disabled={page >= pages || isLoading} onClick={() => setPage((current) => current + 1)}>Вперёд</button></nav>}
  </div>;
}
