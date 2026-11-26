"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { apiRequest } from "@/lib/client-api";
import type { ClientUserRole } from "@/types/user";

interface Consent {
  id: string;
  document: string;
  documentVersion: string;
  acceptedAt: string;
  revokedAt: string | null;
}

const documentLabels: Record<string, string> = {
  privacy: "Обработка персональных данных",
  communication: "Необязательные информационные сообщения",
};

export function AccountSettings({ role }: { role: ClientUserRole }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [consents, setConsents] = useState<Consent[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const result = await apiRequest<{ consents: Consent[] }>("/api/profile/consents");
      setConsents(result.consents);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось загрузить согласия");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const revoke = async () => {
    setError("");
    try {
      const result = await apiRequest<{ consents: Consent[] }>("/api/profile/consents", { method: "PATCH", body: JSON.stringify({ document: "communication" }) });
      setConsents(result.consents);
      showToast("success", "Согласие отозвано", "Необязательные информационные сообщения отключены.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отозвать согласие");
    }
  };

  const removeAccount = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await apiRequest("/api/profile", { method: "DELETE", body: JSON.stringify({ password }) });
      setDeleteOpen(false);
      window.dispatchEvent(new Event("loginStatusChanged"));
      router.push("/");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось удалить аккаунт");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="dashboard__section account-rights">
      <h2>Данные и согласия</h2>
      <p>Вы можете выгрузить сведения аккаунта, отозвать необязательную коммуникацию или удалить аккаунт.</p>
      <div className="account-rights__export"><Button variant="outline" size="md" onClick={() => { window.location.href = "/api/profile/export"; }}>Скачать мои данные</Button></div>
      {consents.length > 0 && <div className="account-rights__consents">{consents.map((consent) => <div key={consent.id}><div><strong>{documentLabels[consent.document] || consent.document}</strong><small>Версия {consent.documentVersion} · принято {new Intl.DateTimeFormat("ru-RU").format(new Date(consent.acceptedAt))}</small>{consent.revokedAt && <small>Отозвано {new Intl.DateTimeFormat("ru-RU").format(new Date(consent.revokedAt))}</small>}</div>{consent.document === "communication" && !consent.revokedAt && <Button variant="outline" size="sm" onClick={revoke}>Отозвать</Button>}</div>)}</div>}
      {role === "PATIENT" || role === "SPECIALIST" ? <div className="account-rights__danger"><h3>Удаление аккаунта</h3><p>Будут удалены профиль, согласия, сессии и связанные файлы. Действие нельзя отменить.</p><Button variant="danger" size="md" onClick={() => setDeleteOpen(true)}>Удалить аккаунт</Button></div> : <p className="account-rights__notice">Для удаления служебного аккаунта обратитесь к администратору организации.</p>}
      {error && <p className="form__error" role="alert">{error}</p>}
      <Modal id="delete-account" title="Удалить аккаунт?" description="Подтвердите удаление аккаунта и связанных данных" isOpen={deleteOpen} onModalClose={() => { setDeleteOpen(false); setPassword(""); setError(""); }} closeOnOverlayClick={false}>
        <form className="account-delete-form" onSubmit={(event) => { event.preventDefault(); void removeAccount(); }}>
          <p>Профиль, согласия, сессии и связанные файлы будут удалены без возможности восстановления.</p>
          <label htmlFor="delete-password">Пароль для подтверждения</label>
          <input id="delete-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="form-input" />
          {error && <p className="form__error" role="alert">{error}</p>}
          <div className="form-actions"><Button variant="outline" onClick={() => { setDeleteOpen(false); setPassword(""); }} disabled={isDeleting}>Отмена</Button><Button type="submit" variant="danger" disabled={isDeleting || !password}>{isDeleting ? "Удаление…" : "Удалить безвозвратно"}</Button></div>
        </form>
      </Modal>
    </section>
  );
}
