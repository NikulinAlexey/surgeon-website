"use client";

import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
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

export default function ProfilePage() {
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
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);
  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    description: "",
  });

  // Переключение режима редактирования
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Обработка изменения основных данных
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработка изменения данных специалиста
  const handleSpecialistInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработка загрузки файла диплома
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

      setDiplomaFile(file);
    }
  };

  // Сохранение основных данных
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

  // Отправка заявки на специалиста
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

  // Отмена заявки на специалиста
  const handleCancelSpecialistRequest = () => {
    setShowSpecialistForm(false);
    setDiplomaFile(null);
    setFormData({
      specialization: "",
      experience: "",
      description: "",
    });
  };

  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="dashboard">
            <div className="dashboard__header">
              <h1 className="dashboard__title">Личный кабинет</h1>
              <div className="dashboard__role-badge">
                {user.role === "patient" && "Пациент"}
                {user.role === "specialist" && "Специалист"}
                {user.role === "pending_specialist" && "Ожидает подтверждения"}
              </div>
            </div>

            <div className="dashboard__content">
              {/* Основная информация */}
              <div className="dashboard__section">
                <div className="dashboard__section-header">
                  <h2>Основная информация</h2>
                  {user.role === "patient" && (
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={toggleEdit}
                    >
                      {isEditing ? "Отменить" : "Редактировать"}
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="firstName" className="form-label">
                        Имя
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing || user.role !== "patient"}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="lastName" className="form-label">
                        Фамилия
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing || user.role !== "patient"}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing || user.role !== "patient"}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="phone" className="form-label">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={!isEditing || user.role !== "patient"}
                      />
                    </div>
                  </div>

                  {isEditing && user.role === "patient" && (
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn btn--primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Сохранение..." : "Сохранить"}
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Блок для пациентов - подтверждение специалиста */}
              {user.role === "patient" && (
                <div className="dashboard__section">
                  <div className="specialist-promo">
                    <h3>Стать специалистом</h3>
                    <p>
                      Подтвердите свою квалификацию и получите доступ к
                      расширенным возможностям платформы для медицинских
                      специалистов.
                    </p>

                    {!showSpecialistForm ? (
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => setShowSpecialistForm(true)}
                      >
                        Подтвердить, что я специалист
                      </button>
                    ) : (
                      <form
                        onSubmit={handleSubmitSpecialistRequest}
                        className="specialist-form"
                      >
                        <div className="form-grid">
                          <div className="form-field">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              Специализация *
                            </label>
                            <input
                              type="text"
                              id="specialization"
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleSpecialistInputChange}
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
                              onChange={handleSpecialistInputChange}
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
                            onChange={handleSpecialistInputChange}
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
                            {isLoading
                              ? "Отправка..."
                              : "Отправить на модерацию"}
                          </button>
                          <button
                            type="button"
                            className="btn btn--secondary"
                            onClick={handleCancelSpecialistRequest}
                            disabled={isLoading}
                          >
                            Отмена
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* Информация для специалистов */}
              {(user.role === "specialist" ||
                user.role === "pending_specialist") && (
                <div className="dashboard__section">
                  <h2>Информация специалиста</h2>

                  {user.role === "pending_specialist" && (
                    <div className="alert alert--info">
                      Ваша заявка находится на рассмотрении. Обычно это занимает
                      до 3 рабочих дней.
                    </div>
                  )}

                  {user.role === "specialist" && (
                    <div className="alert alert--success">
                      Ваш статус специалиста подтвержден!
                    </div>
                  )}

                  <div className="specialist-info">
                    <div className="info-item">
                      <strong>Специализация:</strong>
                      <span>{user.specialization || "Не указана"}</span>
                    </div>
                    <div className="info-item">
                      <strong>Статус верификации:</strong>
                      <span>
                        {user.isVerified
                          ? "Подтвержден"
                          : "Требуется подтверждение"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
