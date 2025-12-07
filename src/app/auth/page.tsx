"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/ui/Field";
import Link from "next/link";
import Button from "@/components/ui/Button";

type AuthMode = "login" | "forgot-password";

interface AuthFormData {
  email: string;
  password: string;
}

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
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

      // Перенаправление на главную страницу после успешного входа
      if (authMode === "login") {
        router.push("/");
        return;
      }

      // Сброс формы после успешной отправки
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    <main className="layout__main">
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
                  <h1 className="text text--xxl text-bold">
                    {authMode === "login" && "Рады видеть!"}
                    {authMode === "forgot-password" && "Восстановление пароля"}
                  </h1>
                </div>

                <div className="auth__body" role="main">
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="form__container">
                      <div className="form__layout">
                        <fieldset className="form__fieldset">
                          <Field
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            placeholder="your@email.com"
                            disabled={isLoading}
                          />
                          {authMode === "login" && (
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
                    <Button
                      size="lg"
                      wide
                      type="submit"
                      variant="secondary"
                      className="auth__action"
                      disabled={isLoading}
                    >
                      {getSubmitButtonText()}
                    </Button>
                  </div>
                  <div className="auth__text">
                    {authMode === "login" && (
                      <Button
                        type="button"
                        className="auth__action"
                        onClick={() => setAuthMode("forgot-password")}
                      >
                        Забыли пароль?
                      </Button>
                    )}

                    {authMode === "forgot-password" && (
                      <Button
                        type="button"
                        className="auth__action"
                        onClick={() => setAuthMode("login")}
                      >
                        Вернуться ко входу
                      </Button>
                    )}
                  </div>
                  <p className="auth__text">
                    Ещё не зарегистрированы?{" "}
                    <Link href={`/register`} className="auth__link">
                      Регистрация
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
