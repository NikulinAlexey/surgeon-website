"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ClientUserRole } from "@/types/user";

const editorLinks = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/content", label: "Материалы" },
  { href: "/admin/pages", label: "Страницы и FAQ" },
  { href: "/admin/organization", label: "Организация" },
  { href: "/admin/settings", label: "Контакты" },
];
const adminLinks = [
  { href: "/admin/verifications", label: "Верификация" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/audit", label: "Журнал" },
];

export function AdminNav({ role, pendingCount = 0 }: { role: ClientUserRole; pendingCount?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const links = role === "ADMIN" ? [...editorLinks, ...adminLinks] : editorLinks;
  const current = links.find((link) => link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href));

  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isOpen]);

  return (
    <div className="admin-nav">
      <button
        type="button"
        className="admin-nav__toggle"
        aria-expanded={isOpen}
        aria-controls="admin-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{current?.label || "Административная панель"}</span>
        <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <nav id="admin-navigation" className="admin-nav__menu" data-open={isOpen} aria-label="Административная панель">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className="admin-nav__link" aria-current={active ? "page" : undefined}>
              <span>{link.label}</span>
              {link.href === "/admin/verifications" && pendingCount > 0 && <span className="admin-nav__badge">{pendingCount}</span>}
            </Link>
          );
        })}
        <div className="admin-nav__mobile-links">
          <Link href="/profile">Личный кабинет</Link>
          <Link href="/">Вернуться на сайт</Link>
        </div>
      </nav>
    </div>
  );
}
