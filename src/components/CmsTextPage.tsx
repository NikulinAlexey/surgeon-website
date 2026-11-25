import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import { safeBody } from "@/lib/content";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { notFound } from "next/navigation";

export async function CmsTextPage({ slug, showFaq = true }: { slug: string; showFaq?: boolean }) {
  const [page, settings] = await Promise.all([getCmsPage(slug), getSiteSettings()]);
  if (!page) notFound();

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main">
        <Banner title={page.title} subtitle={page.subtitle || undefined} />
        {page.body ? (
          <Section id="page-content">
            <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
          </Section>
        ) : (
          <Section id="page-content">
            <p>Информация для этого раздела готовится к публикации.</p>
          </Section>
        )}
        {showFaq && page.faq.length > 0 && (
          <FAQ id="page-faq" title="Часто задаваемые вопросы" faqData={page.faq} />
        )}
      </main>
      <Footer />
    </>
  );
}
