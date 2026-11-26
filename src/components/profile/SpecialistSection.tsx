import Button from "../ui/Button";
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
          <Button type="button" variant="primary" size="md" onClick={props.onShowForm}>Подать заявку</Button>
        ) : <SpecialistForm {...props} />}
      </div>
    </section>
  );
}
