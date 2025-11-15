import Link from "next/link";

export default function NotFound() {
  return (
    <main className="layout__main">
      <div className="error-page">
        <div className="error-page__container">
          <h1 className="error-page__title">404</h1>
          <p className="error-page__message">Страница не найдена</p>
          <p className="error-page__description">
            Извините, запрашиваемая страница не существует.
          </p>
          <Link href="/" className="error-page__link">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}