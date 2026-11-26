"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess, formatDate, roleLabels, verificationLabels } from "./AdminStates";
import { ConfirmDialog } from "./ConfirmDialog";
import type { AdminUserItem } from "./types";
import type { ClientUserRole } from "@/types/user";

export function UserDetail({ id }: { id: string }) {
  const [user, setUser] = useState<AdminUserItem | null>(null);
  const [role, setRole] = useState<ClientUserRole>("PATIENT");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ user: AdminUserItem }>(`/api/admin/users/${id}`);
      setUser(result.user);
      setRole(result.user.role);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить пользователя");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { void load(); }, [load]);

  const action = async (name: "BLOCK" | "UNBLOCK" | "SET_ROLE") => {
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      await apiRequest(`/api/admin/users/${id}`, { method: "PATCH", body: JSON.stringify({ action: name, ...(name === "SET_ROLE" ? { role } : {}) }) });
      setMessage(name === "SET_ROLE" ? "Роль изменена" : name === "BLOCK" ? "Пользователь заблокирован" : "Пользователь разблокирован");
      setBlockOpen(false);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось изменить пользователя");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLoading />;
  if (!user) return <AdminError>{error || "Пользователь не найден"}</AdminError>;

  return (
    <div className="admin-page">
      <header className="admin-page__header admin-page__header--sticky"><div><Link href="/admin/users" className="admin__back">← Все пользователи</Link><h1>{user.lastName} {user.firstName} {user.patronymic || ""}</h1><p className="admin__muted">Зарегистрирован: {formatDate(user.createdAt)}</p></div><span className={`admin-status admin-status--${user.status.toLowerCase()}`}>{user.status === "ACTIVE" ? "Активен" : "Заблокирован"}</span></header>
      <AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess>
      <section className="admin-section"><h2>Контактные данные</h2><dl className="admin-definition-list"><div><dt>Email</dt><dd>{user.email} ({user.emailVerifiedAt ? "подтверждён" : "не подтверждён"})</dd></div><div><dt>Телефон</dt><dd>{user.phone || "—"}</dd></div><div><dt>Дата рождения</dt><dd>{user.birthDate ? new Intl.DateTimeFormat("ru-RU").format(new Date(user.birthDate)) : "—"}</dd></div><div><dt>Специализация</dt><dd>{user.specialistProfile?.specialization || "—"}</dd></div></dl>{user.specialistProfile?.description && <p className="admin__prewrap">{user.specialistProfile.description}</p>}</section>
      <section className="admin-section"><h2>Роль и доступ</h2><div className="admin-form-grid"><label><span>Роль</span><select value={role} onChange={(event) => setRole(event.target.value as ClientUserRole)} disabled={isSaving}>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div><div className="admin-submit-bar"><button type="button" className="admin-button admin-button--primary" onClick={() => void action("SET_ROLE")} disabled={isSaving || role === user.role}>Сохранить роль</button><button type="button" className="admin-button admin-button--danger" onClick={() => user.status === "ACTIVE" ? setBlockOpen(true) : void action("UNBLOCK")} disabled={isSaving}>{user.status === "ACTIVE" ? "Заблокировать" : "Разблокировать"}</button></div><p className="admin__muted">Назначение роли SPECIALIST вручную не заменяет проверку документов. Используйте очередь верификации.</p></section>
      <section className="admin-section"><h2>Заявки на верификацию</h2>{user.verificationRequests.length ? <div className="admin-page-list">{user.verificationRequests.map((request) => <article key={request.id}><div><strong>{verificationLabels[request.status]}</strong><p>{formatDate(request.submittedAt)}</p>{request.rejectionReason && <p>{request.rejectionReason}</p>}</div><Link className="admin-link" href={`/admin/verifications/${request.id}`}>Открыть</Link></article>)}</div> : <p className="admin__empty">Заявок нет.</p>}</section>
      <section className="admin-section"><h2>Согласия</h2>{user.consents?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Документ</th><th>Версия</th><th>Принят</th></tr></thead><tbody>{user.consents.map((consent) => <tr key={consent.id}><td data-label="Документ">{consent.document}</td><td data-label="Версия">{consent.documentVersion}</td><td data-label="Принят">{formatDate(consent.acceptedAt)}</td></tr>)}</tbody></table></div> : <p className="admin__empty">Записей нет.</p>}</section>
      <ConfirmDialog isOpen={blockOpen} title="Заблокировать пользователя?" description="Все активные сессии пользователя будут завершены. Доступ можно восстановить позже." confirmLabel="Заблокировать" danger isLoading={isSaving} onClose={() => setBlockOpen(false)} onConfirm={() => void action("BLOCK")} />
    </div>
  );
}
