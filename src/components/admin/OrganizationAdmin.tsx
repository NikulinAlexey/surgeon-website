"use client";

import { useState } from "react";
import Link from "next/link";
import { apiRequest, ApiRequestError } from "@/lib/client-api";
import { AdminError, AdminSuccess } from "./AdminStates";
import { ConfirmDialog } from "./ConfirmDialog";

interface OrganizationInfo {
  fullName: string;
  shortName: string;
  legalAddress: string;
  actualAddress: string;
  licenseNumber: string;
  licenseIssuedBy: string;
  licenseIssueDate: string;
  licenseValidUntil: string;
  licenseActivities: string;
  stateGuaranteeInfo: string;
  appointmentInfo: string;
  insuranceInfo: string;
}

interface ChecklistItem { key: string; label: string; complete: boolean }
interface Doctor { id: string; fullName: string; position: string; specialization: string; education: string; qualification: string; sortOrder: number; isPublished: boolean }
interface MedicalService { id: string; title: string; description: string; price: string; duration: string; isPaid: boolean; sortOrder: number; isPublished: boolean }

type DoctorInput = Omit<Doctor, "id">;
type ServiceInput = Omit<MedicalService, "id">;

const emptyDoctor: DoctorInput = { fullName: "", position: "", specialization: "", education: "", qualification: "", sortOrder: 0, isPublished: true };
const emptyService: ServiceInput = { title: "", description: "", price: "", duration: "", isPaid: false, sortOrder: 0, isPublished: true };

export function OrganizationAdmin({ initialInfo, initialDoctors, initialServices, initialChecklist }: {
  initialInfo: OrganizationInfo;
  initialDoctors: Doctor[];
  initialServices: MedicalService[];
  initialChecklist: ChecklistItem[];
}) {
  const [tab, setTab] = useState<"info" | "doctors" | "services">("info");
  const [info, setInfo] = useState(initialInfo);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [services, setServices] = useState(initialServices);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const incomplete = checklist.filter((item) => !item.complete);

  const saveInfo = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiRequest<{ info: OrganizationInfo; checklist: ChecklistItem[] }>("/api/admin/organization", { method: "PUT", body: JSON.stringify(info) });
      setInfo(result.info);
      setChecklist(result.checklist);
      setMessage("Данные организации сохранены");
    } catch (reason) {
      setError(reason instanceof ApiRequestError && reason.fields ? Object.values(reason.fields).join("; ") : reason instanceof Error ? reason.message : "Не удалось сохранить");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header"><div><p className="admin__eyebrow">Официальные сведения</p><h1>Организация</h1><p className="admin__lead">Управление лицензией, врачами, услугами и публичной юридической информацией.</p></div><div className="admin-actions"><Link className="admin-button" href="/license" target="_blank">Лицензия</Link><Link className="admin-button" href="/doctors" target="_blank">Врачи</Link><Link className="admin-button" href="/services" target="_blank">Услуги</Link></div></header>
      {incomplete.length > 0 && <div className="admin-alert admin-alert--warning" role="status"><strong>Требуется заполнить:</strong><ul className="admin-checklist">{incomplete.map((item) => <li key={item.key}>{item.label}</li>)}</ul></div>}
      <div className="admin-tabs" role="tablist" aria-label="Данные организации">
        <button type="button" role="tab" aria-selected={tab === "info"} className={tab === "info" ? "_active" : ""} onClick={() => setTab("info")}>Основные данные</button>
        <button type="button" role="tab" aria-selected={tab === "doctors"} className={tab === "doctors" ? "_active" : ""} onClick={() => setTab("doctors")}>Врачи ({doctors.length})</button>
        <button type="button" role="tab" aria-selected={tab === "services"} className={tab === "services" ? "_active" : ""} onClick={() => setTab("services")}>Услуги ({services.length})</button>
      </div>
      <AdminError>{error}</AdminError><AdminSuccess>{message}</AdminSuccess>
      {tab === "info" && <form className="admin-section" onSubmit={saveInfo}>
        <h2>Организация и лицензия</h2>
        <div className="admin-form-grid">
          <label className="admin-form-grid__wide"><span>Полное наименование *</span><textarea rows={2} value={info.fullName} onChange={(event) => setInfo({ ...info, fullName: event.target.value })} required /></label>
          <label><span>Краткое наименование</span><input value={info.shortName} onChange={(event) => setInfo({ ...info, shortName: event.target.value })} /></label>
          <label><span>Номер лицензии *</span><input value={info.licenseNumber} onChange={(event) => setInfo({ ...info, licenseNumber: event.target.value })} placeholder="Внесите реальный номер" /></label>
          <label><span>Юридический адрес *</span><textarea rows={2} value={info.legalAddress} onChange={(event) => setInfo({ ...info, legalAddress: event.target.value })} required /></label>
          <label><span>Фактический адрес *</span><textarea rows={2} value={info.actualAddress} onChange={(event) => setInfo({ ...info, actualAddress: event.target.value })} required /></label>
          <label><span>Орган, выдавший лицензию *</span><input value={info.licenseIssuedBy} onChange={(event) => setInfo({ ...info, licenseIssuedBy: event.target.value })} /></label>
          <label><span>Дата выдачи *</span><input value={info.licenseIssueDate} onChange={(event) => setInfo({ ...info, licenseIssueDate: event.target.value })} placeholder="ДД.ММ.ГГГГ" /></label>
          <label><span>Срок действия *</span><input value={info.licenseValidUntil} onChange={(event) => setInfo({ ...info, licenseValidUntil: event.target.value })} placeholder="ДД.ММ.ГГГГ или бессрочно" /></label>
          <label className="admin-form-grid__wide"><span>Разрешённые виды медицинской деятельности *</span><textarea rows={4} value={info.licenseActivities} onChange={(event) => setInfo({ ...info, licenseActivities: event.target.value })} required /></label>
          <label className="admin-form-grid__wide"><span>Порядок записи на приём *</span><textarea rows={4} value={info.appointmentInfo} onChange={(event) => setInfo({ ...info, appointmentInfo: event.target.value })} required /></label>
          <label className="admin-form-grid__wide"><span>Программа государственных гарантий</span><textarea rows={4} value={info.stateGuaranteeInfo} onChange={(event) => setInfo({ ...info, stateGuaranteeInfo: event.target.value })} /></label>
          <label className="admin-form-grid__wide"><span>Страховая деятельность</span><textarea rows={3} value={info.insuranceInfo} onChange={(event) => setInfo({ ...info, insuranceInfo: event.target.value })} /></label>
        </div>
        <div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : "Сохранить организацию"}</button></div>
      </form>}
      {tab === "doctors" && <DoctorsManager doctors={doctors} setDoctors={setDoctors} setError={setError} setMessage={setMessage} />}
      {tab === "services" && <ServicesManager services={services} setServices={setServices} setError={setError} setMessage={setMessage} />}
    </div>
  );
}

function DoctorsManager({ doctors, setDoctors, setError, setMessage }: { doctors: Doctor[]; setDoctors: (doctors: Doctor[]) => void; setError: (error: string) => void; setMessage: (message: string) => void }) {
  const [form, setForm] = useState<DoctorInput>(emptyDoctor);
  const [editingId, setEditingId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiRequest<{ doctor: Doctor }>(editingId ? `/api/admin/doctors/${editingId}` : "/api/admin/doctors", { method: editingId ? "PATCH" : "POST", body: JSON.stringify(form) });
      setDoctors(editingId ? doctors.map((doctor) => doctor.id === editingId ? result.doctor : doctor) : [...doctors, result.doctor]);
      setForm(emptyDoctor);
      setEditingId("");
      setMessage(editingId ? "Врач обновлён" : "Врач добавлен");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить врача");
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async () => {
    setIsSaving(true);
    try {
      await apiRequest(`/api/admin/doctors/${deleteId}`, { method: "DELETE" });
      setDoctors(doctors.filter((doctor) => doctor.id !== deleteId));
      setDeleteId("");
      setMessage("Запись о враче удалена");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось удалить врача");
    } finally {
      setIsSaving(false);
    }
  };

  return <div className="admin-resource-grid">
    <form className="admin-section" onSubmit={submit}><h2>{editingId ? "Редактирование врача" : "Добавить врача"}</h2><div className="admin-form-grid admin-form-grid--single">
      <label><span>ФИО *</span><input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /></label>
      <label><span>Должность *</span><input value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} required /></label>
      <label><span>Специализация *</span><input value={form.specialization} onChange={(event) => setForm({ ...form, specialization: event.target.value })} required /></label>
      <label><span>Образование *</span><textarea rows={4} value={form.education} onChange={(event) => setForm({ ...form, education: event.target.value })} required /></label>
      <label><span>Квалификация *</span><textarea rows={4} value={form.qualification} onChange={(event) => setForm({ ...form, qualification: event.target.value })} required /></label>
      <label><span>Порядок сортировки</span><input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} /></label>
      <label className="admin-check"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /><span>Опубликовать на сайте</span></label>
    </div><div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : editingId ? "Сохранить врача" : "Добавить врача"}</button>{editingId && <button className="admin-button" type="button" onClick={() => { setForm(emptyDoctor); setEditingId(""); }}>Отмена</button>}</div></form>
    <section className="admin-section"><h2>Медицинские работники</h2>{doctors.length === 0 ? <p className="admin__empty">Врачи не добавлены.</p> : <div className="admin-page-list">{doctors.map((doctor) => <article key={doctor.id}><div><h3>{doctor.fullName}</h3><p>{doctor.position} · {doctor.specialization}</p><small>{doctor.isPublished ? "Опубликовано" : "Скрыто"} · Порядок {doctor.sortOrder}</small></div><div className="admin-actions"><button type="button" onClick={() => { setEditingId(doctor.id); setForm({ fullName: doctor.fullName, position: doctor.position, specialization: doctor.specialization, education: doctor.education, qualification: doctor.qualification, sortOrder: doctor.sortOrder, isPublished: doctor.isPublished }); }}>Редактировать</button><button type="button" className="admin-link--danger" onClick={() => setDeleteId(doctor.id)}>Удалить</button></div></article>)}</div>}</section>
    <ConfirmDialog isOpen={Boolean(deleteId)} title="Удалить запись о враче?" description="Запись исчезнет с публичной страницы врачей." confirmLabel="Удалить" danger isLoading={isSaving} onClose={() => setDeleteId("")} onConfirm={() => void remove()} />
  </div>;
}

function ServicesManager({ services, setServices, setError, setMessage }: { services: MedicalService[]; setServices: (services: MedicalService[]) => void; setError: (error: string) => void; setMessage: (message: string) => void }) {
  const [form, setForm] = useState<ServiceInput>(emptyService);
  const [editingId, setEditingId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiRequest<{ service: MedicalService }>(editingId ? `/api/admin/services/${editingId}` : "/api/admin/services", { method: editingId ? "PATCH" : "POST", body: JSON.stringify(form) });
      setServices(editingId ? services.map((service) => service.id === editingId ? result.service : service) : [...services, result.service]);
      setForm(emptyService);
      setEditingId("");
      setMessage(editingId ? "Услуга обновлена" : "Услуга добавлена");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить услугу");
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async () => {
    setIsSaving(true);
    try {
      await apiRequest(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      setServices(services.filter((service) => service.id !== deleteId));
      setDeleteId("");
      setMessage("Услуга удалена");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось удалить услугу");
    } finally {
      setIsSaving(false);
    }
  };

  return <div className="admin-resource-grid">
    <form className="admin-section" onSubmit={submit}><h2>{editingId ? "Редактирование услуги" : "Добавить услугу"}</h2><div className="admin-form-grid admin-form-grid--single">
      <label><span>Название *</span><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
      <label><span>Описание</span><textarea rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
      <label><span>Стоимость</span><input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Например, 1 500 ₽" /></label>
      <label><span>Длительность</span><input value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} placeholder="Например, 30 минут" /></label>
      <label><span>Порядок сортировки</span><input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} /></label>
      <label className="admin-check"><input type="checkbox" checked={form.isPaid} onChange={(event) => setForm({ ...form, isPaid: event.target.checked })} /><span>Платная услуга</span></label>
      <label className="admin-check"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /><span>Опубликовать на сайте</span></label>
    </div><div className="admin-submit-bar"><button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>{isSaving ? "Сохранение…" : editingId ? "Сохранить услугу" : "Добавить услугу"}</button>{editingId && <button className="admin-button" type="button" onClick={() => { setForm(emptyService); setEditingId(""); }}>Отмена</button>}</div></form>
    <section className="admin-section"><h2>Перечень услуг</h2>{services.length === 0 ? <p className="admin__empty">Услуги не добавлены.</p> : <div className="admin-page-list">{services.map((service) => <article key={service.id}><div><h3>{service.title}</h3><p>{service.isPaid ? service.price || "Платная" : "Без оплаты"}{service.duration ? ` · ${service.duration}` : ""}</p><small>{service.isPublished ? "Опубликовано" : "Скрыто"} · Порядок {service.sortOrder}</small></div><div className="admin-actions"><button type="button" onClick={() => { setEditingId(service.id); setForm({ title: service.title, description: service.description, price: service.price, duration: service.duration, isPaid: service.isPaid, sortOrder: service.sortOrder, isPublished: service.isPublished }); }}>Редактировать</button><button type="button" className="admin-link--danger" onClick={() => setDeleteId(service.id)}>Удалить</button></div></article>)}</div>}</section>
    <ConfirmDialog isOpen={Boolean(deleteId)} title="Удалить услугу?" description="Услуга исчезнет с публичных страниц услуг и цен." confirmLabel="Удалить" danger isLoading={isSaving} onClose={() => setDeleteId("")} onConfirm={() => void remove()} />
  </div>;
}
