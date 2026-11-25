import { SpecialistForm } from "./SpecialistForm";

interface SpecialistFormData { specialization: string; experience: string; description: string }
interface SpecialistSectionProps {
  showSpecialistForm: boolean;
  onShowForm: () => void;
  formData: SpecialistFormData;
  onFormDataChange: (data: SpecialistFormData) => void;
  documents: File[];
  onDocumentsChange: (files: File[]) => void;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

export function SpecialistSection(props: SpecialistSectionProps) {
  return (
    <section className="dashboard__section">
      <div className="specialist-promo">
        <h2>Подтверждение профиля специалиста</h2>
        <p>Заполните профессиональные данные и прикрепите документы. Решение администратора появится в личном кабинете.</p>
        {!props.showSpecialistForm ? (
          <button type="button" className="btn btn--primary" onClick={props.onShowForm}>Подать заявку</button>
        ) : <SpecialistForm {...props} />}
      </div>
    </section>
  );
}
