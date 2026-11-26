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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsBurgerClicked(false), []);
  const handleMenuClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) setIsBurgerClicked((value) => !value);
  }, []);
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
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  useEffect(() => {
    if (!isBurgerClicked) return;
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        headerRef.current?.querySelector<HTMLElement>(".header__burger button")?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button:not(:disabled)"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isBurgerClicked, closeMenu]);

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
    <header
      id="header"
      ref={headerRef}
      className={cn("header", { _active: isBurgerClicked, _scrolled: isScrolled, "header--compact": compact })}
    >
      <div className="header__container">
        <Link href="/" className="header__logo logo" aria-label="Перейти на главную страницу">
          <SvgIcon className="logo__icon" name="logo-icon" aria-hidden />
        </Link>
        {!compact && (
          <>
            <div className="header__burger">
              <Burger onClick={handleMenuClick} isBurgerClicked={isBurgerClicked} />
            </div>
            <div
              ref={menuRef}
              id="main-navigation"
              onClick={handleMenuClick}
              className={cn("header__menu", { _active: isBurgerClicked })}
            >
              <div className="header__nav nav">
                <div className="nav__body">
                  <ul className="nav__list">
                    {navArray.map(({ link, title }) => {
                      const isActive = pathname === link || pathname.startsWith(`${link}/`);
                      return (
                        <li className="nav__item" key={link}>
                          <Link
                            href={link}
                            className={cn("nav__link", { _active: isActive })}
                            onClick={closeMenu}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="nav__text">{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {phone && (
                    <Link className="nav__link nav__phone" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                      <SvgIcon className="nav__icon" name="phone" aria-hidden />
                      <span className="nav__text">{phone}</span>
                    </Link>
                  )}
                  <div className="nav__profile" suppressHydrationWarning>
                    {isLoggedIn === null ? (
                      <span className="nav__profile-placeholder" aria-hidden="true" />
                    ) : (
                      <ButtonLink
                        className="nav__profile-button"
                        variant="outline-inverted"
                        size="md"
                        href={isLoggedIn ? "/profile" : "/auth"}
                        aria-label={isLoggedIn ? "Открыть личный кабинет" : "Войти в профиль"}
                      >
                        <SvgIcon className="button__icon" name="user" size="24" aria-hidden />
                        <span className="button__text">{isLoggedIn ? "Личный кабинет" : "Войти в профиль"}</span>
                      </ButtonLink>
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
