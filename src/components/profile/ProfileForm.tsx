import Field from "../ui/Field";

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

interface ProfileFormProps {
  user: UserProfile;
  onUserChange: (user: UserProfile) => void;
  isEditing: boolean;
  isLoading: boolean;
  onSave: (e: React.FormEvent) => void;
  onToggleEdit: () => void;
}

export function ProfileForm({
  user,
  onUserChange,
  isEditing,
  isLoading,
  onSave,
  onToggleEdit,
}: ProfileFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUserChange({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="dashboard__section">
      <div className="dashboard__section-header">
        <h2>Основная информация</h2>
        {user.role === "patient" && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onToggleEdit}
          >
            {isEditing ? "Отменить" : "Редактировать"}
          </button>
        )}
      </div>

      <form onSubmit={onSave} className="form">
        <div className="form-grid">
          <Field
            variant="primary"
            label="Имя"
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            disabled={!isEditing || user.role !== "patient"}
          />

          <Field
            variant="primary"
            label="Фамилия"
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            disabled={!isEditing || user.role !== "patient"}
          />

          <Field
            variant="primary"
            label="Email"
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            disabled={!isEditing || user.role !== "patient"}
          />

          <Field
            variant="primary"
            label="Телефон"
            type="tel"
            id="phone"
            name="email"
            value={user.phone || ""}
            onChange={handleInputChange}
            disabled={!isEditing || user.role !== "patient"}
          />
        </div>

        {isEditing && user.role === "patient" && (
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isLoading}
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
