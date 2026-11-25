"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ClientUserRole } from "@/types/user";

const editorLinks = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/content", label: "Материалы" },
  { href: "/admin/pages", label: "Страницы и FAQ" },
  { href: "/admin/settings", label: "Контакты" },
];
const adminLinks = [
  { href: "/admin/verifications", label: "Верификация" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/audit", label: "Журнал" },
];

export function AdminNav({ role }: { role: ClientUserRole }) {
  const pathname = usePathname();
  const links = role === "ADMIN" ? [...editorLinks, ...adminLinks] : editorLinks;
  return (
    <nav className="admin-nav" aria-label="Административная панель">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return <Link key={link.href} href={link.href} className="admin-nav__link" aria-current={active ? "page" : undefined}>{link.label}</Link>;
      })}
    </nav>
  );
}
