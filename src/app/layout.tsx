import type { Metadata } from "next";

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
    <html lang="ru">
      <body className="page">
        <div className="layout">{children}</div>
      </body>
    </html>
  );
}
