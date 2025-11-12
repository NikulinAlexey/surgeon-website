import { useState } from "react";

type UserRole = "patient" | "specialist" | "pending_specialist";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  specialization?: string;
  experience?: number;
  diplomaFile?: File | null;
  isVerified: boolean;
}

export function useProfile() {
  const [user, setUser] = useState<UserProfile>({
    id: "1",
    email: "user@example.com",
    firstName: "Иван",
    lastName: "Иванов",
    role: "patient",
    phone: "+7 (999) 999-99-99",
    isVerified: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Заглушка для сохранения профиля
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Профиль сохранен:", user);
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    setUser,
    isEditing,
    isLoading,
    toggleEdit,
    handleSaveProfile,
  };
}