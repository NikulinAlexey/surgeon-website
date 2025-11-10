"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { useState } from "react";

type AuthMode = "login" | "register" | "forgot-password";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthFormData> = {};

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

    // Confirm password validation for register
    if (authMode === "register") {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Заглушка для запроса
      console.log("Отправка формы:", { authMode, formData });

      // Имитация запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Здесь будет реальный запрос
      // const response = await authApi[authMode](formData);

      console.log("Форма успешно отправлена");

      // Сброс формы после успешной отправки
      if (authMode !== "forgot-password") {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof AuthFormData]) {
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

    switch (authMode) {
      case "login":
        return "Войти";
      case "register":
        return "Зарегистрироваться";
      case "forgot-password":
        return "Восстановить пароль";
      default:
        return "Отправить";
    }
  };

  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="auth-page">
            <div className="auth-page__header">
              <h1 className="auth-page__title">
                {authMode === "login" && "Вход"}
                {authMode === "register" && "Регистрация"}
                {authMode === "forgot-password" && "Восстановление пароля"}
              </h1>

              <div className="auth-page__tabs">
                <button
                  type="button"
                  className={`auth-page__tab ${
                    authMode === "login" ? "auth-page__tab--active" : ""
                  }`}
                  onClick={() => setAuthMode("login")}
                >
                  Вход
                </button>
                <button
                  type="button"
                  className={`auth-page__tab ${
                    authMode === "register" ? "auth-page__tab--active" : ""
                  }`}
                  onClick={() => setAuthMode("register")}
                >
                  Регистрация
                </button>
              </div>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
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

              {authMode !== "forgot-password" && (
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
              )}

              {authMode === "register" && (
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
              )}

              {authMode === "login" && (
                <div className="auth-form__field auth-form__field--checkbox">
                  <label className="auth-form__checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <span>Запомнить меня</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="auth-form__submit"
                disabled={isLoading}
              >
                {getSubmitButtonText()}
              </button>

              {authMode === "login" && (
                <div className="auth-form__links">
                  <button
                    type="button"
                    className="auth-form__link"
                    onClick={() => setAuthMode("forgot-password")}
                  >
                    Забыли пароль?
                  </button>
                </div>
              )}

              {authMode === "forgot-password" && (
                <div className="auth-form__links">
                  <button
                    type="button"
                    className="auth-form__link"
                    onClick={() => setAuthMode("login")}
                  >
                    Вернуться к входу
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Для SEO - генерация метаданных
// export async function generateMetadata() {
//   return {
//     title: "Вход | Доктор Хаус",
//     description: "Войдите в свой аккаунт или зарегистрируйтесь",
//   };
// }
