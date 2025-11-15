"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="layout__main">
      <div className="error-page">
        <div className="error-page__container">
          <h1 className="error-page__title">500</h1>
          <p className="error-page__message">Внутренняя ошибка сервера</p>
          <p className="error-page__description">
            Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
          </p>
          <button onClick={reset} className="error-page__button">
            Попробовать снова
          </button>
        </div>
      </div>
    </main>
  );
}