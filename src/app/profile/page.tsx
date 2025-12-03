"use client";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SpecialistInfo } from "@/components/profile/SpecialistInfo";
import { SpecialistSection } from "@/components/profile/SpecialistSection";
import { useProfile } from "@/hooks/useProfile";
import { useSpecialistForm } from "@/hooks/useSpecialistForm";

export default function ProfilePage() {
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

  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="dashboard">
            <div className="dashboard__header">
              <h1 className="dashboard__title">Личный кабинет</h1>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
