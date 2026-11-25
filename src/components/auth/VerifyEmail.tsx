"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/client-api";

export function VerifyEmail({ token }: { token: string }) {
  const started = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Подтверждаем email…");

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!token) {
      setStatus("error");
      setMessage("Ссылка не содержит токен подтверждения");
      return;
    }
    apiRequest<{ message: string }>("/api/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((result) => {
        setStatus("success");
        setMessage(result.message);
      })
      .catch((error: unknown) => {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Не удалось подтвердить email");
      });
  }, [token]);

  return (
    <div className="auth__body" aria-live="polite">
      <h1 className="text text--xxl text-bold">Подтверждение email</h1>
      <p className={status === "error" ? "form__error" : "form-hint"}>{message}</p>
      {status !== "loading" && <Link href="/auth" className="auth__link">Перейти ко входу</Link>}
    </div>
  );
}
