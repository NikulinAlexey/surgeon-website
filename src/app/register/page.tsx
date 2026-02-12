"use client";
import { Header } from "@/components/header/Header";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Field from "@/components/ui/Field";
import Progress from "@/components/ui/Progress";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    fields: ["firstName", "lastName", "patronymic"],
  },
  {
    title: "Контакты",
    fields: ["email", "phone"],
  },
  {
    title: "Пароль и соглашения",
    fields: [
      "password",
      "confirmPassword",
      "birthDate",
      "agreePersonalData",
      "agreeCommunication",
    ],
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [registerStep, setRegisterStep] = useState(0);
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
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "Имя обязательно";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Фамилия обязательна";
      }
    } else if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "Email обязателен";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Некорректный email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Телефон обязателен";
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Пароль обязателен";
      } else if (formData.password.length < 6) {
        newErrors.password = "Пароль должен быть не менее 6 символов";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Подтверждение пароля обязательно";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
      if (!formData.agreePersonalData) {
        newErrors.agreePersonalData =
          "Согласие на обработку персональных данных обязательно";
      }
      if (!formData.agreeCommunication) {
        newErrors.agreeCommunication = "Согласие на коммуникацию обязательно";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if ("preventDefault" in e) e.preventDefault();

    if (!validateStep(registerStep)) {
      return;
    }

    if (registerStep < 2) {
      setRegisterStep(registerStep + 1);
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

      router.push("/auth");

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
      setRegisterStep(0);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (registerStep > 0) {
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

    return registerStep === 2 ? "Зарегистрироваться" : "Далее";
  };

  return (
    <>
      <Header compact />
      <main className="layout__main">
        <div className="section">
          <div className="section__container">
            <div className="auth">
              <div className="auth__container">
                <div className="auth__layout">
                  <div
                    className="auth__header"
                    role="banner"
                    aria-label="Заголовок формы"
                  >
                    <h1 className="text text--xxl text-bold">
                      Добро пожаловать
                    </h1>
                  </div>

                  <Progress
                    className="auth__progress"
                    stepsLenght={REGISTER_STEPS.length}
                    currentStep={registerStep + 1}
                  />

                  <div className="auth__body" role="main">
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form__container">
                        <div className="form__layout">
                          <h2 className="form__title text text--lg">
                            {REGISTER_STEPS[registerStep].title}
                          </h2>
                          <fieldset className="form__fieldset">
                            {registerStep === 0 && (
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
                                  error={errors.firstName}
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      firstName: "",
                                    }))
                                  }
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
                                  error={errors.lastName}
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      lastName: "",
                                    }))
                                  }
                                />
                                <Field
                                  label="Отчество (необязательно)"
                                  type="text"
                                  id="patronymic"
                                  name="patronymic"
                                  value={
                                    formData.patronymic
                                      ? formData.patronymic
                                      : ""
                                  }
                                  onChange={handleInputChange}
                                  placeholder="Введите отчество"
                                  disabled={isLoading}
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      patronymic: "",
                                    }))
                                  }
                                />
                              </>
                            )}
                            {registerStep === 1 && (
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
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      email: "",
                                    }))
                                  }
                                />
                                <Field
                                  label="Телефон"
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="Введите телефон"
                                  disabled={isLoading}
                                  error={errors.phone}
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      phone: "",
                                    }))
                                  }
                                />
                              </>
                            )}
                            {registerStep === 2 && (
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
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      password: "",
                                    }))
                                  }
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
                                  onReset={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      confirmPassword: "",
                                    }))
                                  }
                                />
                                <Field
                                  label="Дата рождения"
                                  type="date"
                                  id="birthDate"
                                  name="birthDate"
                                  value={
                                    formData.birthDate ? formData.birthDate : ""
                                  }
                                  onChange={handleInputChange}
                                  disabled={isLoading}
                                />
                                <div className="form__checkboxes">
                                  <Checkbox
                                    required
                                    label={
                                      <>
                                        Я согласен на обработку{" "}
                                        <a
                                          className="checkbox__link"
                                          href="#"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          персональных данных
                                        </a>
                                      </>
                                    }
                                    name="agreePersonalData"
                                    checked={formData.agreePersonalData}
                                    onChange={(checked) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        agreePersonalData: checked,
                                      }))
                                    }
                                    disabled={isLoading}
                                  />
                                  {errors.agreePersonalData && (
                                    <p className="form__error">
                                      {errors.agreePersonalData}
                                    </p>
                                  )}
                                  <Checkbox
                                    required
                                    label="Я согласен на коммуникацию посредством цифровых способов связи"
                                    name="agreeCommunication"
                                    checked={formData.agreeCommunication}
                                    onChange={(checked) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        agreeCommunication: checked,
                                      }))
                                    }
                                    disabled={isLoading}
                                  />
                                  {errors.agreeCommunication && (
                                    <p className="form__error">
                                      {errors.agreeCommunication}
                                    </p>
                                  )}
                                </div>
                              </>
                            )}
                          </fieldset>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div
                    className="auth__footer"
                    role="contentinfo"
                    aria-label="Подвал формы"
                  >
                    <div className="auth__actions">
                      {registerStep > 0 && (
                        <Button
                          type="button"
                          size="lg"
                          wide
                          variant="primary"
                          className="auth__action"
                          onClick={handleBack}
                          disabled={isLoading}
                        >
                          Назад
                        </Button>
                      )}

                      <Button
                        size="lg"
                        wide
                        type="submit"
                        variant="secondary"
                        className="auth__action"
                        disabled={isLoading}
                        onClick={(e) => handleSubmit(e)}
                      >
                        {getSubmitButtonText()}
                      </Button>
                    </div>
                    <p className="auth__text">
                      Уже зарегистрированы?{" "}
                      <Link href={`/auth`} className="auth__link">
                        Войти
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
