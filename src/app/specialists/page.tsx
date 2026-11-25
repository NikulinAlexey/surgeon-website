import type { Metadata } from "next";
import Articles from "@/components/articles/Articles";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import AskQuestion from "@/components/AskQuestion";
import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import Section from "@/components/Section";
import { getPublishedContent, safeBody } from "@/lib/content";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { toPublicContentCard } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("specialists");
  return { title: page?.seoTitle || "Специалистам", description: page?.seoDescription || undefined };
}

export default async function SpecialistPage() {
  const [page, articles, settings] = await Promise.all([
    getCmsPage("specialists"),
    getPublishedContent("ARTICLE", 12),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main">
        <Banner title={page?.title || "Специалистам"} subtitle={page?.subtitle || undefined} />
        {page?.body && (
          <Section id="specialists-information">
            <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
          </Section>
        )}
        <Articles items={articles.map(toPublicContentCard)} />
        {page && page.faq.length > 0 && <FAQ id="specialists-faq" faqData={page.faq} />}
        {settings.email && <AskQuestion email={settings.email} />}
      </main>
      <Footer />
    </>
  );
}
