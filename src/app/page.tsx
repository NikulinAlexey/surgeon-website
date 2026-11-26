import type { Metadata } from "next";
import News from "@/components/news/News";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { getPublishedContent, safeBody } from "@/lib/content";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { toPublicContentCard } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("home");
  return {
    title: page?.seoTitle || page?.title || "Архангельский региональный урологический центр",
    description: page?.seoDescription || page?.subtitle || undefined,
  };
}

export default async function Home() {
  const [page, news, settings] = await Promise.all([
    getCmsPage("home"),
    getPublishedContent("NEWS", 12),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <Hero
          title={page?.title || "Архангельский региональный урологический центр"}
          description={page?.subtitle || "Первый урологический центр Поморья."}
        />
        {page?.body && (
          <section className="section">
            <div className="section__container container">
              <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
            </div>
          </section>
        )}
        <News items={news.map(toPublicContentCard)} />
        {page && page.faq.length > 0 && (
          <FAQ id="faq-main" title="Часто задаваемые вопросы" faqData={page.faq} />
        )}
      </main>
      <Footer phone={settings.phone || undefined} email={settings.email || undefined} address={settings.address || undefined} workHours={settings.workHours || undefined} />
    </>
  );
}
