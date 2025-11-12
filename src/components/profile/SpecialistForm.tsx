
interface SpecialistFormData {
  specialization: string;
  experience: string;
  description: string;
}

interface SpecialistFormProps {
  formData: SpecialistFormData;
  onFormDataChange: (data: SpecialistFormData) => void;
  diplomaFile: File | null;
  onDiplomaFileChange: (file: File | null) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function SpecialistForm({
  formData,
  onFormDataChange,
  diplomaFile,
  onDiplomaFileChange,
  isLoading,
  onSubmit,
  onCancel,
}: SpecialistFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.includes("image/") && file.type !== "application/pdf") {
        alert("Пожалуйста, загрузите изображение или PDF файл");
        return;
      }

      // Проверка размера файла (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

      onDiplomaFileChange(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="specialist-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="specialization" className="form-label">
            Специализация *
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Например: Терапевт, Хирург, Невролог"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="experience" className="form-label">
            Опыт работы (лет)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="form-input"
            placeholder="5"
            min="0"
            max="50"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Дополнительная информация
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Расскажите о своем опыте, образовании, достижениях..."
          rows={4}
        />
      </div>

      <div className="form-field">
        <label htmlFor="diploma" className="form-label">
          Скан диплома о медицинском образовании *
        </label>
        <input
          type="file"
          id="diploma"
          name="diploma"
          onChange={handleFileChange}
          className="form-file"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          required
        />
        <div className="form-file-info">
          {diplomaFile ? (
            <span>Выбран файл: {diplomaFile.name}</span>
          ) : (
            <span>Формат: JPG, PNG, PDF (макс. 5MB)</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={isLoading || !diplomaFile}
        >
          {isLoading ? "Отправка..." : "Отправить на модерацию"}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}