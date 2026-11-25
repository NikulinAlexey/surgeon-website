"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { ProfileForm } from "./ProfileForm";
import { SpecialistInfo } from "./SpecialistInfo";
import { SpecialistSection } from "./SpecialistSection";
import { ClientUser } from "@/types/user";
import { apiRequest } from "@/lib/client-api";

const roleNames = { PATIENT: "Пациент", SPECIALIST: "Специалист", EDITOR: "Редактор", ADMIN: "Администратор" };

export function ProfileView({ initialUser }: { initialUser: ClientUser }) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [formData, setFormData] = useState({ specialization: "", experience: "", description: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const reloadUser = async () => {
    const result = await apiRequest<{ user: ClientUser }>("/api/profile");
    setUser(result.user);
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      await apiRequest("/api/profile", { method: "PATCH", body: JSON.stringify({
        firstName: user.firstName, lastName: user.lastName, patronymic: user.patronymic,
        phone: user.phone, birthDate: user.birthDate,
      }) });
      await reloadUser();
      setIsEditing(false);
      setMessage("Профиль сохранён");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось сохранить профиль");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSpecialist = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      documents.forEach((file) => payload.append("documents", file));
      await apiRequest("/api/profile/specialist", { method: "POST", body: payload });
      await reloadUser();
      setShowSpecialistForm(false);
      setDocuments([]);
      setMessage("Заявка отправлена на проверку");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отправить заявку");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await apiRequest("/api/auth/logout", { method: "POST", body: JSON.stringify({}) });
      window.dispatchEvent(new Event("loginStatusChanged"));
      router.push("/auth");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось выйти");
    }
  };

  const canApply = user.role === "PATIENT" && user.verification?.status !== "PENDING";
  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="section__container">
          <div className="dashboard">
            <div className="dashboard__header">
              <div>
                <h1 className="dashboard__title text text--xxl text-bold">Личный кабинет</h1>
                <p>{user.lastName} {user.firstName}</p>
              </div>
              <div className="dashboard__role-badge">{roleNames[user.role]}</div>
            </div>
            {(message || error) && <div className={`alert ${error ? "alert--error" : "alert--success"}`} role={error ? "alert" : "status"}>{error || message}</div>}
            <div className="dashboard__content">
              <ProfileForm user={user} onUserChange={setUser} isEditing={isEditing} isLoading={isLoading} onSave={handleSaveProfile} onToggleEdit={() => setIsEditing((value) => !value)} />
              {(user.specialistProfile || user.verification) && <SpecialistInfo user={user} />}
              {canApply && <SpecialistSection
                showSpecialistForm={showSpecialistForm}
                onShowForm={() => setShowSpecialistForm(true)}
                formData={formData}
                onFormDataChange={setFormData}
                documents={documents}
                onDocumentsChange={setDocuments}
                isLoading={isLoading}
                onSubmit={handleSubmitSpecialist}
                onCancel={() => { setShowSpecialistForm(false); setDocuments([]); }}
              />}
              {(user.role === "ADMIN" || user.role === "EDITOR") && <Link className="btn btn--secondary" href="/admin">Открыть административную панель</Link>}
            </div>
            <Button lifted wide size="md" variant="danger" onClick={handleLogout}>Выйти</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
