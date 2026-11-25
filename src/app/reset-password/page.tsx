import { Header } from "@/components/header/Header";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = { title: "Восстановление пароля" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <><Header compact /><main className="layout__main"><div className="section"><div className="section__container"><div className="auth"><div className="auth__container"><div className="auth__layout"><ResetPasswordForm token={token} /></div></div></div></div></div></main></>
  );
}
