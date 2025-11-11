import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доктор Хаус",
  description: "Страница входа",
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
