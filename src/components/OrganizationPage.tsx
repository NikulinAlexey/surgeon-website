import type { ReactNode } from "react";
import Banner from "./Banner";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { Header } from "./header/Header";
import { getSiteSettings } from "@/lib/pages";

export async function OrganizationPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <Banner title={title} subtitle={subtitle} breadcrumbs={<Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: title }]} />} />
        <section className="section">
          <div className="section__container legal-page">{children}</div>
        </section>
      </main>
      <Footer phone={settings.phone || undefined} email={settings.email || undefined} address={settings.address || undefined} workHours={settings.workHours || undefined} />
    </>
  );
}
