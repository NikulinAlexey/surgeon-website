export interface ReviewFormData {
  patientName: string;
  rating: number;
  text: string;
  doctor: string;
  treatment: string;
  agreeToTerms: boolean;
}

export interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  initialData?: Partial<ReviewFormData>;
  isLoading?: boolean;
  isEditing?: boolean;
}
