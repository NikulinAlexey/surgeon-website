// components/Header/Header.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/clsx";
import {
  useState,
  memo,
  useCallback,
  useRef,
  useEffect,
  useReducer,
} from "react";
import Burger from "./Burger";
import SvgIcon from "../ui/SvgIcon";
import ButtonLink from "../ui/ButtonLink";
import { useCookies } from "@/hooks/useCookies";
import { usePathname } from "next/navigation";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface NavItem {
  title: string;
  link: string;
}

interface HeaderComponentProps {
  compact?: boolean;
}

const navArray: NavItem[] = [
  { title: "О нас", link: "/about" },
  { title: "Пациентам", link: "/patients" },
  { title: "Специалистам", link: "/specialists" },
  { title: "Контакты", link: "/contacts" },
  // { title: "Конференции", link: "/conferences" },
];

function HeaderComponent({ compact }: HeaderComponentProps) {
  const pathname = usePathname();
  const { get } = useCookies();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
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

  const updateHeaderHeight = () => {
    const header = headerRef.current;
    if (!header) return;

    const height = header.offsetHeight;

    // Записываем в :root CSS переменную
    document.documentElement.style.setProperty(
      "--header-height",
      `${height}px`,
    );
  };

  // Первоначальный замер
  updateHeaderHeight();
  useLockBodyScroll(isBurgerClicked);

  useEffect(() => {
    const updateLoginStatus = () => {
      forceUpdate();
    };

    window.addEventListener("loginStatusChanged", updateLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", updateLoginStatus);
    };
  }, [forceUpdate]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Только ResizeObserver для самого header
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    // Наблюдаем ТОЛЬКО за header
    resizeObserver.observe(header);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn("header", {
        _active: isBurgerClicked,
        "header--compact": compact,
      })}
    >
      <div className="header__container">
        <Link href="/" className="header__logo logo" aria-label="Перейти на главную страницу">
          <SvgIcon className="logo__icon" name="logo-icon" aria-hidden />
        </Link>

        {!compact && (
          <>
            <div className="header__burger">
              <Burger
                onClick={handleMenuClick}
                isBurgerClicked={isBurgerClicked}
              />
            </div>

            <div
              onClick={handleMenuClick}
              className={cn("header__menu", { _active: isBurgerClicked })}
            >
              <div className="header__nav nav">
                <div className="nav__body">
                  <ul className="nav__list">
                    {navArray.map(({ link, title }, index) => {
                      const isActive = link === pathname;
                      return (
                        <li className="nav__item" key={index}>
                          <Link
                            href={link}
                            className={cn(
                              "nav__link text text--sm text--regular",
                              {
                                _active: isActive,
                              },
                            )}
                            onClick={handleLinkClick}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="nav__text">{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    className="nav__link text text--sm text--regular"
                    href="tel:88120000000"
                  >
                    <SvgIcon className="nav__icon" name="phone" />
                    <span className="nav__text">8 (812) 000-00-00</span>
                  </Link>
                  <div className="nav__profile" suppressHydrationWarning={true}>
                    {get("isLoggedIn") === "true" ? (
                      <ButtonLink
                        variant="lk"
                        href="/profile"
                        aria-label="Войти в личный кабинет"
                      >
                        <SvgIcon
                          className="button__icon"
                          name="user"
                          size="24"
                        />
                        <span className="button__text">Личный кабинет</span>
                      </ButtonLink>
                    ) : (
                      <ButtonLink
                        variant="outline-inverted"
                        wide
                        size="md"
                        text="Войти в профиль"
                        href="/auth"
                      />
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
