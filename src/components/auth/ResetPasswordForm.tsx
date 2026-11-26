"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { apiRequest } from "@/lib/client-api";

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(token ? "" : "Ссылка не содержит токен восстановления");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;
    if (password.length < 12 || password.length > 72) {
      setError("Пароль должен содержать от 12 до 72 символов");
      return;
    }
    if (password !== confirmation) {
      setError("Пароли не совпадают");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const result = await apiRequest<{ message: string }>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setMessage(result.message);
      setPassword("");
      setConfirmation("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось изменить пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth__body">
      <h1 className="text text--xxl text-bold">Новый пароль</h1>
      {message ? (
        <div role="status"><p className="form-hint">{message}</p><Link href="/auth" className="auth__link">Перейти ко входу</Link></div>
      ) : (
        <form className="form" onSubmit={submit} noValidate>
          <fieldset className="form__fieldset" disabled={isLoading || !token}>
            <Field label="Новый пароль (от 12 символов)" id="new-password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={isLoading} required autoComplete="new-password" message="Используйте от 12 до 72 символов" />
            <Field label="Повторите пароль" id="confirm-new-password" name="confirmation" type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} disabled={isLoading} required autoComplete="new-password" />
          </fieldset>
          {error && <p className="form__error" role="alert">{error}</p>}
          <Button type="submit" size="lg" wide variant="secondary" disabled={isLoading || !token}>
            {isLoading ? "Сохранение…" : "Сохранить пароль"}
          </Button>
        </form>
      )}
    </div>
  );
}
