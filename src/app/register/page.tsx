"use client";
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

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if ("preventDefault" in e) e.preventDefault();

    if (registerStep < 2) {
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
    <main className="layout__main">
      <Progress
        className="auth__progress"
        stepsLenght={REGISTER_STEPS.length}
        currentStep={registerStep + 1}
      />
      <div className="section">
        <div className="container">
          <div className="auth">
            <div className="auth__container">
              <div className="auth__layout">
                <div
                  className="auth__header"
                  role="banner"
                  aria-label="Заголовок формы"
                >
                  <h1 className="text text--xxl text-bold">Добро пожаловать</h1>
                </div>

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
                                value={
                                  formData.patronymic ? formData.patronymic : ""
                                }
                                onChange={handleInputChange}
                                placeholder="Введите отчество"
                                disabled={isLoading}
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
                                value={
                                  formData.birthDate ? formData.birthDate : ""
                                }
                                onChange={handleInputChange}
                                disabled={isLoading}
                              />
                              <div className="form__checkboxes">
                                <Checkbox
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
                                <Checkbox
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
  );
}
