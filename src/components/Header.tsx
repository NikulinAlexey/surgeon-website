"use client";
import Link from "next/link";
import { cn } from "@/lib/clsx";
import { useState } from "react";

const navArray = [
  { title: "Пациентам", link: "/patients" },
  { title: "Специалистам", link: "/specialists" },
  { title: "Контакты", link: "/contacts" },
];

export default function Header() {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    // Закрываем меню только если кликнули на оверлей (не на контент)
    if (e.target === e.currentTarget) {
      setIsBurgerClicked(false);
    }
  };
  return (
    <header className="header">
      <div className="header__container container">
        <Link href="/" className="header__logo logo">
          <span className="logo__text">Logo</span>
        </Link>
        <div className="header__nav-control">
          <button
            aria-label={
              isBurgerClicked
                ? "Закрыть меню навигации"
                : "Открыть меню навигации"
            }
            className={cn("burger", {
              _active: isBurgerClicked,
            })}
            onClick={() => setIsBurgerClicked(!isBurgerClicked)}
          >
            <span className="burger__slice" />
          </button>
        </div>
        <div
          onClick={handleMenuClick}
          className={cn("header__menu", { _active: isBurgerClicked })}
        >
          <div className="header__nav nav">
            <div className="nav__body" onClick={(e) => e.stopPropagation()}>
              <ul className="nav__list">
                {navArray.map(({ link, title }, index) => (
                  <li className="nav__item" key={index}>
                    <Link href={link} className="nav__link">
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
