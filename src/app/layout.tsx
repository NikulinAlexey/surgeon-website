import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/Toast";

import "../scss/main.scss";

export const metadata: Metadata = {
  title: {
    default: "Урологическое отделение | Первая ГКБ им. Е. Е. Волосевич",
    template: "%s | Первая ГКБ им. Е. Е. Волосевич",
  },
  description:
    "Информация для пациентов и специалистов урологического отделения Первой ГКБ им. Е. Е. Волосевич.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="page">
        <a href="#main-content" className="skip-link">Перейти к содержимому</a>
        <ToastProvider><div className="layout">{children}</div></ToastProvider>
      </body>
    </html>
  );
}
