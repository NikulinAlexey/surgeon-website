import Field from "../ui/Field";
import { ClientUser } from "@/types/user";

interface ProfileFormProps {
  user: ClientUser;
  onUserChange: (user: ClientUser) => void;
  isEditing: boolean;
  isLoading: boolean;
  onSave: (event: React.FormEvent) => void;
  onToggleEdit: () => void;
}

export function ProfileForm({ user, onUserChange, isEditing, isLoading, onSave, onToggleEdit }: ProfileFormProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUserChange({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <section className="dashboard__section">
      <div className="dashboard__section-header">
        <h2>Основная информация</h2>
        <button type="button" className="btn btn--secondary" onClick={onToggleEdit} disabled={isLoading}>
          {isEditing ? "Отменить" : "Редактировать"}
        </button>
      </div>
      <form onSubmit={onSave} className="form">
        <div className="form-grid">
          <Field variant="primary" label="Имя" type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleInputChange} disabled={!isEditing} />
          <Field variant="primary" label="Фамилия" type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleInputChange} disabled={!isEditing} />
          <Field variant="primary" label="Отчество" type="text" id="patronymic" name="patronymic" value={user.patronymic || ""} onChange={handleInputChange} disabled={!isEditing} />
          <Field variant="primary" label="Телефон" type="tel" id="phone" name="phone" value={user.phone || ""} onChange={handleInputChange} disabled={!isEditing} />
          <Field variant="primary" label="Дата рождения" type="date" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleInputChange} disabled={!isEditing} />
          <Field variant="primary" label="Email" type="email" id="email" name="email" value={user.email} onChange={handleInputChange} disabled />
        </div>
        {!user.emailVerifiedAt && <p className="form-hint" role="status">Email ещё не подтверждён. Проверьте почту.</p>}
        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="btn btn--primary" disabled={isLoading}>
              {isLoading ? "Сохранение…" : "Сохранить"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
