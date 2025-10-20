// components/Hero/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container container">
        {/* Контентная часть */}
        <div className="hero__content">
          <div className="hero__badge">
            <span>Медицинский центр андрологии</span>
          </div>

          <h1 className="hero__title">
            Клиника мужского
            <span className="hero__title-accent"> здоровья</span>
          </h1>

          <p className="hero__subtitle">
            Современная диагностика и комплексное лечение заболеваний мужской
            репродуктивной системы. Команда опытных специалистов и передовое
            оборудование.
          </p>

          <ul className="hero__features">
            <li className="hero__feature">
              <span className="hero__feature-icon">🏥</span>
              Команда из 15+ специалистов
            </li>
            <li className="hero__feature">
              <span className="hero__feature-icon">🔬</span>
              Современное диагностическое оборудование
            </li>
            <li className="hero__feature">
              <span className="hero__feature-icon">⏰</span>
              Запись на прием в день обращения
            </li>
            <li className="hero__feature">
              <span className="hero__feature-icon">💰</span>
              Доступные цены и рассрочка
            </li>
          </ul>

          <div className="hero__actions">
            <Link href="/appointment" className="btn btn--primary btn--large">
              Записаться на прием
            </Link>
            <Link href="/doctors" className="btn btn--outline btn--large">
              Наши врачи
            </Link>
            <Link href="/services" className="btn btn--outline btn--large">
              Услуги и цены
            </Link>
          </div>
        </div>

        {/* Визуальная часть */}
        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <div className="hero__placeholder">
              <span>Фото клиники или команды врачей</span>
            </div>
          </div>

          {/* Блок статистики клиники */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">15+</span>
              <span className="hero__stat-label">Врачей</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">10 000+</span>
              <span className="hero__stat-label">Пациентов</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">95%</span>
              <span className="hero__stat-label">Успешного лечения</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">5+</span>
              <span className="hero__stat-label">Лет работы</span>
            </div>
          </div>

          {/* Доверительные элементы */}
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✅</span>
              Лицензия Минздрава
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✅</span>
              Современное оборудование
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✅</span>
              Гарантия качества
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
