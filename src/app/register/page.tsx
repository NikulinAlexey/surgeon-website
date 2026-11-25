"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header/Header";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Field from "@/components/ui/Field";
import Progress from "@/components/ui/Progress";
import { apiRequest, ApiRequestError } from "@/lib/client-api";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  agreePersonalData: boolean;
  agreeCommunication: boolean;
}

type Errors = Partial<Record<keyof RegisterFormData, string>>;
const steps = ["Личные данные", "Контакты", "Пароль и соглашения"];
const initialData: RegisterFormData = {
  firstName: "", lastName: "", patronymic: "", phone: "", email: "",
  password: "", confirmPassword: "", birthDate: "",
  agreePersonalData: false, agreeCommunication: false,
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateStep = () => {
    const next: Errors = {};
    if (step === 0) {
      if (formData.firstName.trim().length < 2) next.firstName = "Введите имя (минимум 2 символа)";
      if (formData.lastName.trim().length < 2) next.lastName = "Введите фамилию (минимум 2 символа)";
    }
    if (step === 1) {
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = "Введите корректный email";
      if (formData.phone.trim().length < 6) next.phone = "Введите телефон";
    }
    if (step === 2) {
      if (formData.password.length < 12) next.password = "Пароль должен содержать не менее 12 символов";
      if (formData.password.length > 72) next.password = "Пароль должен содержать не более 72 символов";
      if (formData.password !== formData.confirmPassword) next.confirmPassword = "Пароли не совпадают";
      if (!formData.agreePersonalData) next.agreePersonalData = "Необходимо согласие на обработку персональных данных";
      if (!formData.agreeCommunication) next.agreeCommunication = "Необходимо согласие на цифровую коммуникацию";
    }
    setErrors(next);
    return !Object.keys(next).length;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep()) return;
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      setRequestError("");
      return;
    }

    setIsLoading(true);
    setRequestError("");
    try {
      const result = await apiRequest<{ message: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          patronymic: formData.patronymic,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          birthDate: formData.birthDate,
          agreePersonalData: formData.agreePersonalData,
          agreeCommunication: formData.agreeCommunication,
        }),
      });
      setSuccessMessage(result.message);
      setFormData(initialData);
    } catch (error) {
      if (error instanceof ApiRequestError) setErrors(error.fields || {});
      setRequestError(error instanceof Error ? error.message : "Не удалось создать аккаунт");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const setConsent = (name: "agreePersonalData" | "agreeCommunication", checked: boolean) => {
    setFormData((current) => ({ ...current, [name]: checked }));
    setErrors((current) => ({ ...current, [name]: undefined }));
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
                  <div className="auth__header"><h1 className="text text--xxl text-bold">Добро пожаловать</h1></div>
                  {successMessage ? (
                    <div className="auth__body" role="status">
                      <h2 className="form__title text text--lg">Регистрация завершена</h2>
                      <p className="form-hint">{successMessage}</p>
                      <Link href="/auth" className="auth__link">Перейти ко входу</Link>
                    </div>
                  ) : (
                    <>
                      <Progress className="auth__progress" stepsLenght={steps.length} currentStep={step + 1} />
                      <div className="auth__body">
                        <form className="form" onSubmit={handleSubmit} noValidate>
                          <div className="form__container"><div className="form__layout">
                            <h2 className="form__title text text--lg">{steps[step]}</h2>
                            <fieldset className="form__fieldset" disabled={isLoading}>
                              {step === 0 && <>
                                <Field label="Имя" id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} error={errors.firstName} disabled={isLoading} />
                                <Field label="Фамилия" id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} error={errors.lastName} disabled={isLoading} />
                                <Field label="Отчество (необязательно)" id="patronymic" name="patronymic" type="text" value={formData.patronymic} onChange={handleInputChange} disabled={isLoading} />
                              </>}
                              {step === 1 && <>
                                <Field label="Email" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} disabled={isLoading} />
                                <Field label="Телефон" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} disabled={isLoading} />
                              </>}
                              {step === 2 && <>
                                <Field label="Пароль (от 12 символов)" id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} error={errors.password} disabled={isLoading} />
                                <Field label="Подтвердите пароль" id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} disabled={isLoading} />
                                <Field label="Дата рождения (необязательно)" id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} error={errors.birthDate} disabled={isLoading} />
                                <div className="form__checkboxes">
                                  <Checkbox
                                    required
                                    label={<>Я согласен на обработку <Link className="checkbox__link" href="/privacy" target="_blank">персональных данных</Link></>}
                                    name="agreePersonalData"
                                    checked={formData.agreePersonalData}
                                    onChange={(checked) => setConsent("agreePersonalData", checked)}
                                    disabled={isLoading}
                                  />
                                  {errors.agreePersonalData && <p className="form__error">{errors.agreePersonalData}</p>}
                                  <Checkbox
                                    required
                                    label="Я согласен на коммуникацию посредством цифровых способов связи"
                                    name="agreeCommunication"
                                    checked={formData.agreeCommunication}
                                    onChange={(checked) => setConsent("agreeCommunication", checked)}
                                    disabled={isLoading}
                                  />
                                  {errors.agreeCommunication && <p className="form__error">{errors.agreeCommunication}</p>}
                                </div>
                              </>}
                            </fieldset>
                            {requestError && <p className="form__error" role="alert">{requestError}</p>}
                            <div className="auth__actions">
                              {step > 0 && <Button type="button" size="lg" wide variant="primary" onClick={() => setStep((current) => current - 1)} disabled={isLoading}>Назад</Button>}
                              <Button type="submit" size="lg" wide variant="secondary" disabled={isLoading}>
                                {isLoading ? "Отправка…" : step === steps.length - 1 ? "Зарегистрироваться" : "Далее"}
                              </Button>
                            </div>
                          </div></div>
                        </form>
                      </div>
                    </>
                  )}
                  <div className="auth__footer"><p className="auth__text">Уже зарегистрированы? <Link href="/auth" className="auth__link">Войти</Link></p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
