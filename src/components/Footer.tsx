// components/Footer/Footer.tsx
import Link from "next/link";

const footerSections = {
  navigation: {
    title: "Навигация",
    links: [
      { label: "Главная", href: "/" },
      { label: "О враче", href: "/about" },
      { label: "Услуги", href: "/services" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  services: {
    title: "Услуги",
    links: [
      { label: "Консультация андролога", href: "/services/consultation" },
      { label: "Диагностика", href: "/services/diagnostics" },
      { label: "УЗИ предстательной железы", href: "/services/ultrasound" },
      { label: "Лечение простатита", href: "/services/prostatitis" },
      { label: "Мужское здоровье", href: "/services/mens-health" },
    ],
  },
  contacts: {
    title: "Контакты",
    info: [
      { type: "address", value: "г. Москва, ул. Медицинская, д. 15" },
      { type: "phone", value: "+7 (495) 123-45-67", href: "tel:+74951234567" },
      {
        type: "email",
        value: "info@doctor-androlog.ru",
        href: "mailto:info@doctor-androlog.ru",
      },
      { type: "hours", value: "Пн-Пт: 9:00 - 18:00" },
    ],
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Основной контент */}
        <div className="footer__main">
          {/* Блок с контактами и лого */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              Доктор Иванов
            </Link>
            <p className="footer__description">
              Хирург-андролог высшей категории. Современные методы диагностики и
              лечения.
            </p>
            <div className="footer__contacts">
              {footerSections.contacts.info.map((item, index) => (
                <div key={index} className="footer__contact-item">
                  {item.href ? (
                    <a href={item.href} className="footer__contact-link">
                      {item.value}
                    </a>
                  ) : (
                    <span className="footer__contact-text">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Навигационные секции */}
          <div className="footer__sections">
            {/* Навигация */}
            <div className="footer__section">
              <h3 className="footer__section-title">
                {footerSections.navigation.title}
              </h3>
              <ul className="footer__links">
                {footerSections.navigation.links.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Услуги */}
            <div className="footer__section">
              <h3 className="footer__section-title">
                {footerSections.services.title}
              </h3>
              <ul className="footer__links">
                {footerSections.services.links.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © {currentYear} Доктор Иванов. Все права защищены.
          </div>
          <div className="footer__legal">
            <Link href="/privacy" className="footer__legal-link">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="footer__legal-link">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
