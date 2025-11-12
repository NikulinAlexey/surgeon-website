interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "patient" | "specialist" | "pending_specialist";
  phone?: string;
  avatar?: string;
  specialization?: string;
  experience?: number;
  diplomaFile?: File | null;
  isVerified: boolean;
}

interface SpecialistInfoProps {
  user: UserProfile;
}

export function SpecialistInfo({ user }: SpecialistInfoProps) {
  return (
    <div className="dashboard__section">
      <h2>Информация специалиста</h2>

      {user.role === "pending_specialist" && (
        <div className="alert alert--info">
          Ваша заявка находится на рассмотрении. Обычно это занимает до 3 рабочих дней.
        </div>
      )}

      {user.role === "specialist" && (
        <div className="alert alert--success">
          Ваш статус специалиста подтвержден!
        </div>
      )}

      <div className="specialist-info">
        <div className="info-item">
          <strong>Специализация:</strong>
          <span>{user.specialization || "Не указана"}</span>
        </div>
        <div className="info-item">
          <strong>Статус верификации:</strong>
          <span>
            {user.isVerified ? "Подтвержден" : "Требуется подтверждение"}
          </span>
        </div>
      </div>
    </div>
  );
}