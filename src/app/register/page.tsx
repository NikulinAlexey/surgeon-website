"use client";
import Field from "@/components/ui/Field";
import Progress from "@/components/ui/Progress";
import Link from "next/link";
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

const REGISTER_STEPS = [
  {
    title: "Личные данные",
    fields: ["firstName", "lastName", "patronymic", "phone", "email"],
  },
  {
    title: "Контакты",
    fields: ["password", "confirmPassword", "birthDate"],
  },
  {
    title: "Соглашения",
    fields: ["agreePersonalData", "agreeCommunication"],
  },
];

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
    <main className="layout__main">
      <div className="section">
        <div className="container">
          <div className="auth">
            <div className="auth__header">
              <h1 className="text text--xxl text-bold">Добро пожаловать</h1>
            </div>

            <div className="auth__body">
              <form className="auth__form" onSubmit={handleSubmit}>
                <Progress
                  stepsLenght={REGISTER_STEPS.length}
                  currentStep={registerStep}
                />

                <div className="auth-form__section">
                  <h2 className="auth-form__title text">
                    {REGISTER_STEPS[registerStep].title}
                  </h2>
                  {registerStep === 1 && (
                    <>
                      <Field
                        label="Имя"
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Введите имя"
                        disabled={isLoading}
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Field
                        label="Фамилия"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Введите фамилию"
                        disabled={isLoading}
                      />
                      <Field
                        label="Отчество (необязательно)"
                        type="text"
                        id="patronymic"
                        name="patronymic"
                        value={formData.patronymic ? formData.patronymic : ""}
                        onChange={handleInputChange}
                        placeholder="Введите отчество"
                        disabled={isLoading}
                      />
                    </>
                  )}
                  {registerStep === 2 && (
                    <>
                      <Field
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="Введите email"
                        disabled={isLoading}
                      />
                      <Field
                        label="Телефон"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="Введите телефон"
                        disabled={isLoading}
                      />
                    </>
                  )}
                  {registerStep === 3 && (
                    <>
                      <Field
                        label="Пароль"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        placeholder="Введите пароль"
                        disabled={isLoading}
                      />
                      <Field
                        label="Подтвердите пароль"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        placeholder="Повторите пароль"
                        disabled={isLoading}
                      />
                      <Field
                        label="Дата рождения"
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate ? formData.birthDate : ""}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
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
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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
                            Я согласен на коммуникацию посредством цифровых
                            способов связи
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                </div>

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

            <div className="auth__footer">
              <p className="auth__footer-text">
                Уже есть аккаунт?{" "}
                <Link href={`/auth`} className="auth__footer-link">
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
