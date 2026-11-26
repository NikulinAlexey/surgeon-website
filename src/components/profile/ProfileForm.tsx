import Field from "../ui/Field";
import Button from "../ui/Button";
import { ClientUser } from "@/types/user";

interface ProfileFormProps {
  user: ClientUser;
  onUserChange: (user: ClientUser) => void;
  isEditing: boolean;
  isLoading: boolean;
  isDirty: boolean;
  onSave: (event: React.FormEvent) => void;
  onToggleEdit: () => void;
}

export function ProfileForm({ user, onUserChange, isEditing, isLoading, isDirty, onSave, onToggleEdit }: ProfileFormProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUserChange({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <section className="dashboard__section">
      <div className="dashboard__section-header">
        <div>
          <h2>Основная информация</h2>
          {isEditing && <p className="dashboard__section-hint">{isDirty ? "Есть несохранённые изменения" : "Измените хотя бы одно поле, чтобы сохранить данные"}</p>}
        </div>
        <Button type="button" variant="outline" size="md" onClick={onToggleEdit} disabled={isLoading}>
          {isEditing ? "Отменить" : "Редактировать"}
        </Button>
      </div>
      <form onSubmit={onSave} className="form">
        <div className="form-grid">
          <Field variant="primary" label="Имя" type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleInputChange} disabled={!isEditing} autoComplete="given-name" />
          <Field variant="primary" label="Фамилия" type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleInputChange} disabled={!isEditing} autoComplete="family-name" />
          <Field variant="primary" label="Отчество" type="text" id="patronymic" name="patronymic" value={user.patronymic || ""} onChange={handleInputChange} disabled={!isEditing} autoComplete="additional-name" />
          <Field variant="primary" label="Телефон" type="tel" id="phone" name="phone" value={user.phone || ""} onChange={handleInputChange} disabled={!isEditing} autoComplete="tel" />
          <Field variant="primary" label="Дата рождения" type="date" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleInputChange} disabled={!isEditing} autoComplete="bday" />
          <Field variant="primary" label="Email" type="email" id="email" name="email" value={user.email} onChange={handleInputChange} disabled autoComplete="email" />
        </div>
        {!user.emailVerifiedAt && <p className="form-hint" role="status">Email ещё не подтверждён. Проверьте почту.</p>}
        {isEditing && (
          <div className="form-actions">
            <Button type="submit" variant="primary" size="md" disabled={isLoading || !isDirty}>
              {isLoading ? "Сохранение…" : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
