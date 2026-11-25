interface SpecialistFormData {
  specialization: string;
  experience: string;
  description: string;
}

interface SpecialistFormProps {
  formData: SpecialistFormData;
  onFormDataChange: (data: SpecialistFormData) => void;
  documents: File[];
  onDocumentsChange: (files: File[]) => void;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

export function SpecialistForm({ formData, onFormDataChange, documents, onDocumentsChange, isLoading, onSubmit, onCancel }: SpecialistFormProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormDataChange({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="specialist-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="specialization" className="form-label">Специализация *</label>
          <input id="specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} className="form-input" required minLength={2} maxLength={160} disabled={isLoading} />
        </div>
        <div className="form-field">
          <label htmlFor="experience" className="form-label">Опыт работы, лет *</label>
          <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="form-input" min="0" max="80" required disabled={isLoading} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="description" className="form-label">Образование и профессиональный опыт *</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" rows={6} required minLength={20} maxLength={5000} disabled={isLoading} />
      </div>
      <div className="form-field">
        <label htmlFor="documents" className="form-label">Документы об образовании и квалификации *</label>
        <input
          type="file"
          id="documents"
          name="documents"
          multiple
          onChange={(event) => onDocumentsChange(Array.from(event.target.files || []).slice(0, 3))}
          className="form-file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          required
          disabled={isLoading}
        />
        <div className="form-file-info">
          {documents.length ? `${documents.map((file) => file.name).join(", ")}` : "PDF, JPG, PNG или WebP; до 3 файлов, каждый не больше 8 МБ"}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={isLoading || documents.length === 0}>
          {isLoading ? "Отправка…" : "Отправить на проверку"}
        </button>
        <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={isLoading}>Отмена</button>
      </div>
    </form>
  );
}
