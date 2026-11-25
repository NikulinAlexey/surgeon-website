"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/clsx";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Burger from "./Burger";
import SvgIcon from "../ui/SvgIcon";
import ButtonLink from "../ui/ButtonLink";

const navArray = [
  { title: "О нас", link: "/about" },
  { title: "Пациентам", link: "/patients" },
  { title: "Специалистам", link: "/specialists" },
  { title: "Контакты", link: "/contacts" },
];

interface HeaderProps {
  compact?: boolean;
  phone?: string;
}

function HeaderComponent({ compact, phone }: HeaderProps) {
  const pathname = usePathname();
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleMenuClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) setIsBurgerClicked((value) => !value);
  }, []);
  const handleLinkClick = useCallback(() => setIsBurgerClicked(false), []);
  useLockBodyScroll(isBurgerClicked);

  useEffect(() => {
    let active = true;
    const updateLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await response.json();
        if (active) setIsLoggedIn(Boolean(data.user));
      } catch {
        if (active) setIsLoggedIn(false);
      }
    };
    void updateLoginStatus();
    window.addEventListener("loginStatusChanged", updateLoginStatus);
    return () => {
      active = false;
      window.removeEventListener("loginStatusChanged", updateLoginStatus);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };
    updateHeaderHeight();
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <header id="header" ref={headerRef} className={cn("header", { _active: isBurgerClicked, "header--compact": compact })}>
      <div className="header__container">
        <Link href="/" className="header__logo logo" aria-label="Перейти на главную страницу">
          <SvgIcon className="logo__icon" name="logo-icon" aria-hidden />
        </Link>
        {!compact && (
          <>
            <div className="header__burger"><Burger onClick={handleMenuClick} isBurgerClicked={isBurgerClicked} /></div>
            <div onClick={handleMenuClick} className={cn("header__menu", { _active: isBurgerClicked })}>
              <div className="header__nav nav">
                <div className="nav__body">
                  <ul className="nav__list">
                    {navArray.map(({ link, title }) => {
                      const isActive = link === pathname;
                      return (
                        <li className="nav__item" key={link}>
                          <Link href={link} className={cn("nav__link text text--sm text--regular", { _active: isActive })} onClick={handleLinkClick} aria-current={isActive ? "page" : undefined}>
                            <span className="nav__text">{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {phone && (
                    <Link className="nav__link text text--sm text--regular" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                      <SvgIcon className="nav__icon" name="phone" />
                      <span className="nav__text">{phone}</span>
                    </Link>
                  )}
                  <div className="nav__profile" suppressHydrationWarning>
                    {isLoggedIn ? (
                      <ButtonLink variant="lk" href="/profile" aria-label="Открыть личный кабинет">
                        <SvgIcon className="button__icon" name="user" size="24" />
                        <span className="button__text">Личный кабинет</span>
                      </ButtonLink>
                    ) : (
                      <ButtonLink variant="outline-inverted" wide size="md" text="Войти в профиль" href="/auth" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
