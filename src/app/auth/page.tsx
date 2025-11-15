"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";

type AuthMode = "login" | "forgot-password";

interface AuthFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
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

    // Password validation for login
    if (authMode === "login" && !formData.password) {
      newErrors.password = "Пароль обязателен";
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
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
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
      case "forgot-password":
        return "Восстановить пароль";
      default:
        return "Отправить";
    }
  };

  return (
    <>
      <main className="layout__main">
        <div className="auth-page">
          <div className="auth-page__container">
            <div className="auth-page__header">
              <h1 className="auth-page__title">
                {authMode === "login" && "Вход"}
                {authMode === "forgot-password" && "Восстановление пароля"}
              </h1>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <FormField
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="your@email.com"
                disabled={isLoading}
                onReset={() => {
                  setFormData((prev) => ({ ...prev, email: "" }));
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />

              {authMode === "login" && (
                <FormField
                  label="Пароль"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Введите пароль"
                  disabled={isLoading}
                  onReset={() => {
                    setFormData((prev) => ({ ...prev, password: "" }));
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
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
                    Вернуться ко входу
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
