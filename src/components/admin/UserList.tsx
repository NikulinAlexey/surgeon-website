"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, formatDate, roleLabels } from "./AdminStates";
import type { AdminUserItem } from "./types";
import type { ClientUserRole } from "@/types/user";

export function UserList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<ClientUserRole | "">("");
  const [status, setStatus] = useState<"ACTIVE" | "BLOCKED" | "">("");
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ users: AdminUserItem[]; pages: number; total: number }>(`/api/admin/users?${paramsString}`);
      setUsers(result.users);
      setPages(result.pages);
      setTotal(result.total);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить пользователей");
    } finally {
      setIsLoading(false);
    }
  }, [paramsString]);

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
    setRole((searchParams.get("role") as ClientUserRole) || "");
    setStatus((searchParams.get("status") as "ACTIVE" | "BLOCKED") || "");
    void load();
  }, [paramsString, searchParams, load]);

  const navigate = (nextPage: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (role) params.set("role", role);
    if (status) params.set("status", status);
    if (nextPage > 1) params.set("page", String(nextPage));
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Доступ и роли</p><h1>Пользователи</h1><p className="admin__muted">Всего: {total}</p></div></header>
      <form className="admin-filters" onSubmit={(event) => { event.preventDefault(); navigate(1); }}>
        <label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Имя, email или телефон" /></label>
        <label><span>Роль</span><select value={role} onChange={(event) => setRole(event.target.value as ClientUserRole | "")}><option value="">Все роли</option>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label><span>Статус</span><select value={status} onChange={(event) => setStatus(event.target.value as "ACTIVE" | "BLOCKED" | "")}><option value="">Все</option><option value="ACTIVE">Активные</option><option value="BLOCKED">Заблокированные</option></select></label>
        <div className="admin-filters__actions"><button className="admin-button admin-button--primary" type="submit" disabled={isLoading}>Найти</button>{paramsString && <button className="admin-button" type="button" onClick={() => router.replace(pathname)}>Сбросить</button>}</div>
      </form>
      <AdminError>{error}</AdminError>
      {isLoading ? <AdminLoading /> : users.length === 0 ? <div className="admin__empty"><p>Пользователи не найдены.</p>{paramsString && <button type="button" className="admin-link" onClick={() => router.replace(pathname)}>Сбросить фильтры</button>}</div> : (
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Пользователь</th><th>Роль</th><th>Email</th><th>Регистрация</th><th>Статус</th></tr></thead><tbody>
          {users.map((user) => <tr key={user.id}><td data-label="Пользователь"><Link className="admin-link admin-user-link" href={`/admin/users/${user.id}`}><span className="admin-avatar" aria-hidden="true">{user.firstName[0]}{user.lastName[0]}</span><span>{user.lastName} {user.firstName}</span></Link><small>{user.phone || "Телефон не указан"}</small></td><td data-label="Роль">{roleLabels[user.role]}</td><td data-label="Email">{user.email}<small className={user.emailVerifiedAt ? "admin-text-success" : "admin-text-warning"}>{user.emailVerifiedAt ? "Подтверждён" : "Не подтверждён"}</small></td><td data-label="Регистрация">{formatDate(user.createdAt)}</td><td data-label="Статус"><span className={`admin-status admin-status--${user.status.toLowerCase()}`}>{user.status === "ACTIVE" ? "Активен" : "Заблокирован"}</span></td></tr>)}
        </tbody></table></div>
      )}
      {pages > 1 && <nav className="admin-pagination" aria-label="Страницы пользователей"><button type="button" className="admin-button" disabled={page <= 1 || isLoading} onClick={() => navigate(page - 1)}>Назад</button><span>{page} / {pages}</span><button type="button" className="admin-button" disabled={page >= pages || isLoading} onClick={() => navigate(page + 1)}>Вперёд</button></nav>}
    </div>
  );
}
