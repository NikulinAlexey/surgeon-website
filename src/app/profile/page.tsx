"use client";

import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SpecialistInfo } from "@/components/profile/SpecialistInfo";
import { SpecialistSection } from "@/components/profile/SpecialistSection";
import { useProfile } from "@/hooks/useProfile";
import { useSpecialistForm } from "@/hooks/useSpecialistForm";
import { useCookies } from "@/hooks/useCookies";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    setUser,
    isEditing,
    isLoading: profileLoading,
    toggleEdit,
    handleSaveProfile,
  } = useProfile();

  const {
    showSpecialistForm,
    setShowSpecialistForm,
    diplomaFile,
    setDiplomaFile,
    formData,
    setFormData,
    isLoading: specialistLoading,
    handleSubmitSpecialistRequest,
    handleCancelSpecialistRequest,
  } = useSpecialistForm(setUser);

  const { get, remove } = useCookies();

  const handleLogout = () => {
    remove("isLoggedIn");
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/auth");
  };

  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="dashboard">
            <div className="dashboard__header">
              <h1 className="dashboard__title text text--xxl text-bold">
                Личный кабинет
              </h1>
              <div className="dashboard__role-badge">
                {user.role === "patient" && "Пациент"}
                {user.role === "specialist" && "Специалист"}
                {user.role === "pending_specialist" && "Ожидает подтверждения"}
              </div>
            </div>

            <div className="dashboard__content">
              <ProfileForm
                user={user}
                onUserChange={setUser}
                isEditing={isEditing}
                isLoading={profileLoading}
                onSave={handleSaveProfile}
                onToggleEdit={toggleEdit}
              />

              {user.role === "patient" && (
                <SpecialistSection
                  showSpecialistForm={showSpecialistForm}
                  onShowForm={() => setShowSpecialistForm(true)}
                  formData={formData}
                  onFormDataChange={setFormData}
                  diplomaFile={diplomaFile}
                  onDiplomaFileChange={setDiplomaFile}
                  isLoading={specialistLoading}
                  onSubmit={handleSubmitSpecialistRequest}
                  onCancel={handleCancelSpecialistRequest}
                />
              )}

              {(user.role === "specialist" ||
                user.role === "pending_specialist") && (
                <SpecialistInfo user={user} />
              )}
            </div>

            {get("isLoggedIn") === "true" && (
              <Button
                lifted
                wide
                size="md"
                variant="danger"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
