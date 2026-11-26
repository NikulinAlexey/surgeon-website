import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCurrentUser, isContentEditor } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = { title: "Административная панель" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin");
  if (!isContentEditor(user)) redirect("/profile");
  const pendingCount = user.role === "ADMIN"
    ? await db.verificationRequest.count({ where: { status: "PENDING" } })
    : 0;

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Link href="/admin" className="admin__brand">Урологический центр<span>Управление сайтом</span></Link>
        <AdminNav role={user.role} pendingCount={pendingCount} />
        <div className="admin__account">
          <span>{user.firstName} {user.lastName}</span>
          <Link href="/profile">Личный кабинет</Link>
          <Link href="/">Вернуться на сайт</Link>
        </div>
      </aside>
      <main className="admin__main">{children}</main>
    </div>
  );
}
