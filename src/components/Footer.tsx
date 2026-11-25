import Link from "next/link";
import SvgIcon from "./ui/SvgIcon";

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
