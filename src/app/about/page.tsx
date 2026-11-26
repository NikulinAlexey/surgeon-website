import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Tile from "@/components/ui/Tile";
import Banner from "@/components/Banner";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { safeBody } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("about");
  return { title: page?.seoTitle || "О нас", description: page?.seoDescription || undefined };
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getCmsPage("about"), getSiteSettings()]);
  const departments = await Promise.all([
    getCmsPage("about/ambulatornoe-otdelenie"),
    getCmsPage("about/dnevnoy-stacionar"),
    getCmsPage("about/urologicheskoe-otdelenie"),
  ]);
  const links = [
    ["about/ambulatornoe-otdelenie", departments[0]],
    ["about/dnevnoy-stacionar", departments[1]],
    ["about/urologicheskoe-otdelenie", departments[2]],
  ] as const;

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <Banner title={page?.title || "О нас"} subtitle={page?.subtitle || undefined} breadcrumbs={<Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: page?.title || "О нас" }]} />} />
        {page?.body && (
          <Section id="about-content">
            <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
          </Section>
        )}
        <Section id="organization" title="Сведения об организации">
          <ul className="grid">
            {[
              ["Лицензия и регистрация", "/license", "Сведения о лицензии, порядке записи и программе гарантий"],
              ["Врачи и специалисты", "/doctors", "Образование и квалификация медицинских работников"],
              ["Медицинские услуги", "/services", "Перечень и описание услуг"],
              ["Цены", "/price", "Стоимость платных услуг"],
              ["Доступность сайта", "/accessibility", "Возможности сайта для людей с ограничениями здоровья"],
            ].map(([title, href, description]) => <li className="grid__item" key={href}><Tile title={title} href={href} description={description} /></li>)}
          </ul>
        </Section>
        <Section id="departments" title="Подразделения">
          <ul className="grid">
            {links.filter(([, item]) => item).map(([slug, item]) => (
              <li className="grid__item" key={slug}>
                <Tile title={item!.title} href={`/${slug}`} description={item!.subtitle} />
              </li>
            ))}
          </ul>
        </Section>
        {page && page.faq.length > 0 && <FAQ id="about-faq" faqData={page.faq} />}
      </main>
      <Footer phone={settings.phone || undefined} email={settings.email || undefined} address={settings.address || undefined} workHours={settings.workHours || undefined} />
    </>
  );
}
