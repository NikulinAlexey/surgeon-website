import Banner from "@/components/Banner";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import { safeBody } from "@/lib/content";
import { getCmsPage, getSiteSettings } from "@/lib/pages";
import { notFound } from "next/navigation";

const sectionLabels: Record<string, string> = {
  about: "О нас",
  patients: "Пациентам",
  specialists: "Специалистам",
};

export async function CmsTextPage({ slug, showFaq = true }: { slug: string; showFaq?: boolean }) {
  const [page, settings] = await Promise.all([getCmsPage(slug), getSiteSettings()]);
  if (!page) notFound();
  const segments = slug.split("/");
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    ...(segments.length > 1 ? [{ label: sectionLabels[segments[0]] || segments[0], href: `/${segments[0]}` }] : []),
    { label: page.title },
  ];
  const footerProps = {
    phone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.address || undefined,
    workHours: settings.workHours || undefined,
  };

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <Banner title={page.title} subtitle={page.subtitle || undefined} breadcrumbs={<Breadcrumbs items={breadcrumbs} />} />
        {page.body ? (
          <Section id="page-content">
            <div className="cms" dangerouslySetInnerHTML={{ __html: safeBody(page.body) }} />
          </Section>
        ) : (
          <Section id="page-content">
            <p className="empty-state">Информация для этого раздела готовится к публикации.</p>
          </Section>
        )}
        {showFaq && page.faq.length > 0 && <FAQ id="page-faq" title="Часто задаваемые вопросы" faqData={page.faq} />}
      </main>
      <Footer {...footerProps} />
    </>
  );
}
