// components/Header/Header.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/clsx";
import { useState, memo, useCallback, useRef, useEffect } from "react";
import Burger from "./ui/Burger";
import SvgIcon from "./ui/SvgIcon";
import ButtonLink from "./ui/ButtonLink";

interface NavItem {
  title: string;
  link: string;
}

const navArray: NavItem[] = [
  { title: "О нас", link: "/about" },
  { title: "Пациентам", link: "/patients" },
  { title: "Специалистам", link: "/specialists" },
  { title: "Контакты", link: "/contacts" },
  { title: "Конференции", link: "/conferences" },
];

function HeaderComponent() {
  const isLoggedIn = false;
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Мемоизированные обработчики
  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsBurgerClicked((prev) => !prev);
    }
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsBurgerClicked(false);
  }, []);

  useEffect(() => {
    const body = document.body;

    if (isBurgerClicked) {
      body.classList.add("_locked");
    } else {
      body.classList.remove("_locked");
    }
  }, [isBurgerClicked]);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerRef.current.offsetHeight}`
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn("header", {
        _active: isBurgerClicked,
      })}
    >
      <div className="header__container container">
        <Link href="/" className="header__logo logo">
          <SvgIcon name="logo-icon" aria-hidden />
        </Link>

        <div className="header__burger">
          <Burger onClick={handleMenuClick} isBurgerClicked={isBurgerClicked} />
        </div>

        <div
          onClick={handleMenuClick}
          className={cn("header__menu", { _active: isBurgerClicked })}
        >
          <div className="header__nav nav">
            <div className="nav__body">
              <ul className="nav__list">
                {navArray.map(({ link, title }, index) => (
                  <li className="nav__item" key={index}>
                    <Link
                      href={link}
                      className="nav__link text text--sm text--regular"
                      onClick={handleLinkClick}
                    >
                      <span className="nav__text">{title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="nav__link text text--sm text--regular"
                href="tel:88120000000"
              >
                <SvgIcon className="nav__icon" name="phone" />
                <span className="nav__text">8 (812) 000-00-00</span>
              </Link>
              <div className="nav__profile">
                {isLoggedIn ? (
                  <ButtonLink text="ЛК" href="/profile" />
                ) : (
                  <ButtonLink text="Войти" href="/auth" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
