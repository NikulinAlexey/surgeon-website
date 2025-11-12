"use client";
import { useState } from "react";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  patronymic?: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate?: string;
  agreePersonalData: boolean;
  agreeCommunication: boolean;
}

export default function RegisterPage() {
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    patronymic: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    agreePersonalData: false,
    agreeCommunication: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerStep < 4) {
      setRegisterStep(registerStep + 1);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Заглушка для запроса
      console.log("Отправка формы регистрации:", formData);

      // Имитация запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Здесь будет реальный запрос
      // const response = await registerApi(formData);

      console.log("Регистрация успешна");

      // Сброс формы после успешной отправки
      setFormData({
        firstName: "",
        lastName: "",
        patronymic: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        agreePersonalData: false,
        agreeCommunication: false,
      });
      setRegisterStep(1);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (registerStep > 1) {
      setRegisterStep(registerStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const getSubmitButtonText = () => {
    if (isLoading) {
      return "Загрузка...";
    }

    return registerStep === 4 ? "Зарегистрироваться" : "Далее";
  };

  return (
    <>
      <main className="layout__main">
        <div className="container">
          <div className="auth-page">
            <div className="auth-page__header">
              <h1 className="auth-page__title">Регистрация</h1>

              <div className="auth-page__tabs">
                <button
                  type="button"
                  className="auth-page__tab auth-page__tab--link"
                  onClick={() => window.location.href = "/auth"}
                >
                  Вход
                </button>
              </div>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form__progress">
                <div className="auth-form__progress-bar">
                  <div
                    className="auth-form__progress-fill"
                    style={{ width: `${(registerStep / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="auth-form__progress-text">
                  Шаг {registerStep} из 4
                </div>
              </div>

              {registerStep === 1 && (
                <div className="auth-form__section">
                  <h3 className="auth-form__section-title">Личные данные</h3>
                  <div className="auth-form__field">
                    <label htmlFor="firstName" className="auth-form__label">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="auth-form__input"
                      placeholder="Введите имя"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="auth-form__field">
                    <label htmlFor="lastName" className="auth-form__label">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="auth-form__input"
                      placeholder="Введите фамилию"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="auth-form__field">
                    <label htmlFor="patronymic" className="auth-form__label">
                      Отчество <span style={{ fontWeight: 'normal', color: '#666' }}>(необязательно)</span>
                    </label>
                    <input
                      type="text"
                      id="patronymic"
                      name="patronymic"
                      value={formData.patronymic}
                      onChange={handleInputChange}
                      className="auth-form__input"
                      placeholder="Введите отчество"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {registerStep === 2 && (
                <div className="auth-form__section">
                  <h3 className="auth-form__section-title">Контактная информация</h3>
                  <div className="auth-form__field">
                    <label htmlFor="phone" className="auth-form__label">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="auth-form__input"
                      placeholder="+7 (999) 999-99-99"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="auth-form__field">
                    <label htmlFor="email" className="auth-form__label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`auth-form__input ${
                        errors.email ? "auth-form__input--error" : ""
                      }`}
                      placeholder="your@email.com"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <span className="auth-form__error">{errors.email}</span>
                    )}
                  </div>
                </div>
              )}

              {registerStep === 3 && (
                <div className="auth-form__section">
                  <h3 className="auth-form__section-title">Учетные данные</h3>
                  <div className="auth-form__field">
                    <label htmlFor="password" className="auth-form__label">
                      Пароль
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`auth-form__input ${
                        errors.password ? "auth-form__input--error" : ""
                      }`}
                      placeholder="Введите пароль"
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <span className="auth-form__error">{errors.password}</span>
                    )}
                  </div>
                  <div className="auth-form__field">
                    <label htmlFor="confirmPassword" className="auth-form__label">
                      Подтвердите пароль
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`auth-form__input ${
                        errors.confirmPassword ? "auth-form__input--error" : ""
                      }`}
                      placeholder="Повторите пароль"
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <span className="auth-form__error">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                  <div className="auth-form__field">
                    <label htmlFor="birthDate" className="auth-form__label">
                      Дата рождения <span style={{ fontWeight: 'normal', color: '#666' }}>(необязательно)</span>
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="auth-form__input"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {registerStep === 4 && (
                <div className="auth-form__section">
                  <h3 className="auth-form__section-title">Согласия</h3>
                  <div className="auth-form__field auth-form__field--checkbox">
                    <label className="auth-form__checkbox-label">
                      <input
                        type="checkbox"
                        name="agreePersonalData"
                        checked={formData.agreePersonalData}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <span>
                        Я согласен на обработку{" "}
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          персональных данных
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="auth-form__field auth-form__field--checkbox">
                    <label className="auth-form__checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeCommunication"
                        checked={formData.agreeCommunication}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <span>
                        Я согласен на коммуникацию посредством цифровых способов связи
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {registerStep > 1 && (
                <button
                  type="button"
                  className="auth-form__back"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Назад
                </button>
              )}

              <button
                type="submit"
                className="auth-form__submit"
                disabled={isLoading}
              >
                {getSubmitButtonText()}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

// Для SEO - генерация метаданных
// export async function generateMetadata() {
//   return {
//     title: "Регистрация | Доктор Хаус",
//     description: "Зарегистрируйтесь в системе",
//   };
// }