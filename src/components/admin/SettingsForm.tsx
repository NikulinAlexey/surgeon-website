"use client";

import { useEffect, useState } from "react";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminLoading, AdminSuccess } from "./AdminStates";

type Settings = { phone: string; email: string; address: string; workHours: string };
const emptySettings: Settings = { phone: "", email: "", address: "", workHours: "" };

export function SettingsForm() {
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiRequest<{ settings: Settings }>("/api/admin/settings").then((result) => setSettings(result.settings)).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Не удалось загрузить настройки")).finally(() => setIsLoading(false));
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true); setError(""); setMessage("");
    try {
      const result = await apiRequest<{ settings: Settings }>("/api/admin/settings", { method: "PUT", body: JSON.stringify(settings) });
      setSettings(result.settings); setMessage("Контакты обновлены на сайте");
    } catch (reason) {
      if (reason instanceof ApiRequestError && reason.fields) setError(Object.values(reason.fields).join("; "));
      else setError(reason instanceof Error ? reason.message : "Не удалось сохранить настройки");
    } finally { setIsSaving(false); }
  };

  if (isLoading) return <AdminLoading />;
  return <div className="admin-page"><header className="admin-page__header"><div><p className="admin__eyebrow">Общие настройки</p><h1>Контакты</h1></div></header><p className="admin__lead">Эти данные используются на странице контактов и в общих элементах сайта.</p><AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess><form className="admin-section admin-form-grid" onSubmit={submit}>
    <label><span>Телефон</span><input type="tel" value={settings.phone} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} disabled={isSaving} /></label>
    <label><span>Email</span><input type="email" value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} disabled={isSaving} /></label>
    <label className="admin-form-grid__wide"><span>Адрес</span><textarea rows={3} value={settings.address} onChange={(event) => setSettings({ ...settings, address: event.target.value })} disabled={isSaving} /></label>
    <label className="admin-form-grid__wide"><span>Время работы</span><input value={settings.workHours} onChange={(event) => setSettings({ ...settings, workHours: event.target.value })} disabled={isSaving} /></label>
    <div className="admin-form-grid__wide"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : "Сохранить контакты"}</button></div>
  </form></div>;
}
