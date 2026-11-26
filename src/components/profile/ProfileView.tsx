"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { useToast } from "@/components/ui/Toast";
import { ProfileForm } from "./ProfileForm";
import { SpecialistInfo } from "./SpecialistInfo";
import { SpecialistSection } from "./SpecialistSection";
import { ClientUser } from "@/types/user";
import { apiRequest } from "@/lib/client-api";

const roleNames = { PATIENT: "Пациент", SPECIALIST: "Специалист", EDITOR: "Редактор", ADMIN: "Администратор" };
const profileKeys = ["firstName", "lastName", "patronymic", "phone", "birthDate"] as const;

export function ProfileView({ initialUser }: { initialUser: ClientUser }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState(initialUser);
  const [savedUser, setSavedUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [formData, setFormData] = useState({ specialization: "", experience: "", description: "" });
  const [error, setError] = useState("");
  const isProfileDirty = profileKeys.some((key) => user[key] !== savedUser[key]);

  const reloadUser = async () => {
    const result = await apiRequest<{ user: ClientUser }>("/api/profile");
    setUser(result.user);
    setSavedUser(result.user);
  };

  const toggleEditing = () => {
    if (isEditing) setUser(savedUser);
    setIsEditing((current) => !current);
    setError("");
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isProfileDirty) return;
    setIsLoading(true);
    setError("");
    try {
      await apiRequest("/api/profile", { method: "PATCH", body: JSON.stringify({
        firstName: user.firstName, lastName: user.lastName, patronymic: user.patronymic || "",
        phone: user.phone || "", birthDate: user.birthDate,
      }) });
      await reloadUser();
      setIsEditing(false);
      showToast("success", "Данные обновлены", "Изменения профиля успешно сохранены.");
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
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      documents.forEach((file) => payload.append("documents", file));
      await apiRequest("/api/profile/specialist", { method: "POST", body: payload });
      await reloadUser();
      setShowSpecialistForm(false);
      setDocuments([]);
      showToast("success", "Заявка отправлена", "Документы переданы администратору на проверку.");
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
            {error && <div className="alert alert--error" role="alert">{error}</div>}
            <div className="dashboard__content">
              <ProfileForm user={user} onUserChange={setUser} isEditing={isEditing} isLoading={isLoading} isDirty={isProfileDirty} onSave={handleSaveProfile} onToggleEdit={toggleEditing} />
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
              <div className="dashboard__actions">
                {(user.role === "ADMIN" || user.role === "EDITOR") && <ButtonLink variant="outline" size="md" href="/admin" text="Открыть административную панель" />}
                <Button size="md" variant="danger" onClick={handleLogout}>Выйти</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
