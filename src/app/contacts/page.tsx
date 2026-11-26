import type { Metadata } from "next";
import Link from "next/link";
import Banner from "@/components/Banner";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Tile from "@/components/ui/Tile";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { safeBody } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("contacts");
  return { title: page?.seoTitle || "Контакты", description: page?.seoDescription || undefined };
}

export default async function ContactsPage() {
  const [page, settings] = await Promise.all([getCmsPage("contacts"), getSiteSettings()]);
  const phoneHref = settings.phone ? `tel:${settings.phone.replace(/[^+\d]/g, "")}` : "";
  const items = [
    { title: "Адрес", description: settings.address },
    { title: "Телефон", description: settings.phone ? <Link href={phoneHref}>{settings.phone}</Link> : "Не указан" },
    { title: "Email", description: settings.email ? <Link href={`mailto:${settings.email}`}>{settings.email}</Link> : "Не указан" },
    { title: "Время работы", description: settings.workHours },
  ].filter((item) => Boolean(item.description));

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <Banner title={page?.title || "Контакты"} subtitle={page?.subtitle || undefined} breadcrumbs={<Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: page?.title || "Контакты" }]} />} />
        {page?.body && (
          <Section id="contacts-details">
            <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
          </Section>
        )}
        <Section id="contacts">
          <div className="contacts">
            <div className="contacts__container">
              <ul className="contacts__info grid grid--wrap">
                {items.map((item) => (
                  <li className="contacts__item grid__item" key={item.title}>
                    <Tile title={item.title} description={item.description} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <Footer phone={settings.phone || undefined} email={settings.email || undefined} address={settings.address || undefined} workHours={settings.workHours || undefined} />
    </>
  );
}
