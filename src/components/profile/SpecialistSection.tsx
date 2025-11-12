import { SpecialistForm } from "./SpecialistForm";

interface SpecialistFormData {
  specialization: string;
  experience: string;
  description: string;
}

interface SpecialistSectionProps {
  showSpecialistForm: boolean;
  onShowForm: () => void;
  formData: SpecialistFormData;
  onFormDataChange: (data: SpecialistFormData) => void;
  diplomaFile: File | null;
  onDiplomaFileChange: (file: File | null) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function SpecialistSection({
  showSpecialistForm,
  onShowForm,
  formData,
  onFormDataChange,
  diplomaFile,
  onDiplomaFileChange,
  isLoading,
  onSubmit,
  onCancel,
}: SpecialistSectionProps) {
  return (
    <div className="dashboard__section">
      <div className="specialist-promo">
        <h3>Стать специалистом</h3>
        <p>
          Подтвердите свою квалификацию и получите доступ к расширенным
          возможностям платформы для медицинских специалистов.
        </p>

        {!showSpecialistForm ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={onShowForm}
          >
            Подтвердить, что я специалист
          </button>
        ) : (
          <SpecialistForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            diplomaFile={diplomaFile}
            onDiplomaFileChange={onDiplomaFileChange}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
}