import { ClientUser } from "@/types/user";

export function SpecialistInfo({ user }: { user: ClientUser }) {
  const verification = user.verification;
  return (
    <section className="dashboard__section">
      <h2>Профиль специалиста</h2>
      {verification?.status === "PENDING" && <div className="alert alert--info" role="status">Заявка находится на проверке.</div>}
      {verification?.status === "APPROVED" && <div className="alert alert--success" role="status">Статус специалиста подтверждён.</div>}
      {verification?.status === "REJECTED" && (
        <div className="alert alert--error" role="alert">
          Заявка отклонена{verification.rejectionReason ? `: ${verification.rejectionReason}` : "."}
        </div>
      )}
      {user.specialistProfile && (
        <div className="specialist-info">
          <div className="info-item"><strong>Специализация:</strong><span>{user.specialistProfile.specialization}</span></div>
          <div className="info-item"><strong>Опыт:</strong><span>{user.specialistProfile.experience} лет</span></div>
          <div className="info-item"><strong>О себе:</strong><span>{user.specialistProfile.description}</span></div>
        </div>
      )}
    </section>
  );
}
