// components/Header/Header.tsx
"use client";
import Link from "next/link";
import { cn } from "@/lib/clsx";
import {
  useState,
  CSSProperties,
  memo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Burger from "./ui/Burger";

interface NavItem {
  title: string;
  link: string;
}

const navArray: NavItem[] = [
  { title: "Пациентам", link: "/patients" },
  { title: "Специалистам", link: "/specialists" },
  { title: "Контакты", link: "/contacts" },
];

function HeaderComponent() {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Мемоизированные обработчики
  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsBurgerClicked((prev) => !prev);
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsBurgerClicked(false);
  }, []);

  console.log(headerHeight);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn("header", {
        _active: isBurgerClicked,
      })}
      style={{ "--header-height": `${headerHeight}px` } as CSSProperties}
    >
      <div className="header__container container">
        <Link href="/" className="header__logo logo">
          <span className="logo__text">Logo</span>
        </Link>

        <div className="header__nav-control">
          <Burger onClick={handleMenuClick} isBurgerClicked={isBurgerClicked} />
        </div>

        <div
          onClick={handleMenuClick}
          className={cn("header__menu", { _active: isBurgerClicked })}
        >
          <div className="header__nav nav" onClick={handleNavClick}>
            <div className="nav__body">
              <ul className="nav__list">
                {navArray.map(({ link, title }, index) => (
                  <li className="nav__item" key={index}>
                    <Link
                      href={link}
                      className="nav__link"
                      onClick={handleLinkClick}
                    >
                      <span className="nav__text">{title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
