import Link from "next/link";
import SvgIcon from "./ui/SvgIcon";

interface FooterProps {
  phone?: string;
  email?: string;
  address?: string;
  workHours?: string;
}

export default function Footer({ phone, email, address, workHours }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "";

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="Перейти на главную страницу">
              <SvgIcon className="logo__icon" size="32" name="logo-icon" aria-hidden />
              <span>Архангельский региональный<br />урологический центр</span>
            </Link>
            <p className="footer__description">Первая ГКБ им. Е. Е. Волосевич</p>
          </div>
          <nav className="footer__section" aria-label="Разделы сайта">
            <h2 className="footer__section-title">Навигация</h2>
            <ul className="footer__links">
              <li><Link href="/about" className="footer__link">О нас</Link></li>
              <li><Link href="/patients" className="footer__link">Пациентам</Link></li>
              <li><Link href="/specialists" className="footer__link">Специалистам</Link></li>
              <li><Link href="/contacts" className="footer__link">Контакты</Link></li>
            </ul>
          </nav>
          {(phone || email || address || workHours) && (
            <div className="footer__section">
              <h2 className="footer__section-title">Контакты</h2>
              <div className="footer__contacts">
                {phone && <Link href={phoneHref} className="footer__link">{phone}</Link>}
                {email && <Link href={`mailto:${email}`} className="footer__link">{email}</Link>}
                {address && <p className="footer__contact-text">{address}</p>}
                {workHours && <p className="footer__contact-text">{workHours}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">© {currentYear} ГБУЗ Архангельской области «Первая ГКБ им. Е. Е. Волосевич»</p>
          <div className="footer__legal">
            <Link href="/privacy" className="footer__link">Конфиденциальность</Link>
            <Link href="/terms" className="footer__link">Соглашение</Link>
            <Link href="/profile" className="footer__link">Личный кабинет</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
