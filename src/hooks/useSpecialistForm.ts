import { useState } from "react";

interface SpecialistFormData {
  specialization: string;
  experience: string;
  description: string;
}

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

export function useSpecialistForm(setUser: (user: UserProfile | ((prev: UserProfile) => UserProfile)) => void) {
  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<SpecialistFormData>({
    specialization: "",
    experience: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSpecialistRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diplomaFile) {
      alert("Пожалуйста, прикрепите скан диплома");
      return;
    }

    if (!formData.specialization) {
      alert("Пожалуйста, укажите специализацию");
      return;
    }

    setIsLoading(true);

    try {
      // Заглушка для отправки заявки
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Заявка отправлена:", {
        ...formData,
        diplomaFile: diplomaFile.name,
      });

      // Обновляем статус пользователя
      setUser((prev) => ({
        ...prev,
        role: "pending_specialist",
        specialization: formData.specialization,
      }));

      setShowSpecialistForm(false);
      setDiplomaFile(null);
      setFormData({
        specialization: "",
        experience: "",
        description: "",
      });

      alert(
        "Заявка отправлена на модерацию. Мы свяжемся с вами в течение 3 рабочих дней."
      );
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Произошла ошибка при отправке заявки");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSpecialistRequest = () => {
    setShowSpecialistForm(false);
    setDiplomaFile(null);
    setFormData({
      specialization: "",
      experience: "",
      description: "",
    });
  };

  return {
    showSpecialistForm,
    setShowSpecialistForm,
    diplomaFile,
    setDiplomaFile,
    formData,
    setFormData,
    isLoading,
    handleSubmitSpecialistRequest,
    handleCancelSpecialistRequest,
  };
}