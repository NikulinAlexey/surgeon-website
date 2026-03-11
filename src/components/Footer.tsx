import Link from "next/link";
import SvgIcon from "./ui/SvgIcon";

const footerSections = {
  navigation: {
    title: "Навигация",
    links: [
      { label: "Главная", href: "/" },
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
      {
        type: "address",
        value: "163001 Архангельская обл., г.Архангельск, ул. Суворова, 1",
      },
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
      <div className="footer__container">
        <Link
          href="/"
          className="footer__logo logo"
          aria-label="Перейти на главную страницу"
        >
          <SvgIcon
            className="logo__icon"
            size="32"
            name="logo-icon"
            aria-hidden
          />
          Первая ГКБ им.Е.Е.Волосевич
        </Link>

        <div className="footer__copyright">
          © {currentYear} ГБУЗ Архангельской области &laquo;Первая ГКБ
          им.Е.Е.Волосевич&raquo;. Все права защищены.
        </div>
        <Link href="/privacy" className="footer__link">
          Политика конфиденциальности
        </Link>
        <Link href="/terms" className="footer__link">
          Пользовательское соглашение
        </Link>
      </div>
    </footer>
  );
}
