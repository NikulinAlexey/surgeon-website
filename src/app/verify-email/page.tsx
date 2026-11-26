import { Header } from "@/components/header/Header";
import { VerifyEmail } from "@/components/auth/VerifyEmail";

export const metadata = { title: "Подтверждение email" };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return (
    <>
      <Header compact />
      <main className="layout__main">
        <div className="section">
          <div className="section__container">
            <div className="auth">
              <div className="auth__container">
                <div className="auth__layout">
                  <VerifyEmail token={token} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
