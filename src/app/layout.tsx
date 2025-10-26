import type { Metadata } from "next";

import "../scss/main.scss";

export const metadata: Metadata = {
  title: "Доктор Хаус",
  description: "Страница доктора",
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
