import Image from "next/image";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Header } from "@/components/header/Header";
import { getPublishedContentBySlug, safeBody } from "@/lib/content";
import { getSiteSettings } from "@/lib/pages";
import { ContentKind } from "@/generated/prisma/client";
import { notFound } from "next/navigation";

export async function PublicContentDetail({ slug, kind }: { slug: string; kind: ContentKind }) {
  const [item, settings] = await Promise.all([getPublishedContentBySlug(slug), getSiteSettings()]);
  if (!item || item.kind !== kind) notFound();

  const date = item.publishedAt ?? item.updatedAt;
  const parent = kind === "ARTICLE"
    ? { label: "Специалистам", href: "/specialists#articles" }
    : { label: "Новости", href: "/#news" };

  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main" id="main-content">
        <article className="section">
          <div className="section__container container">
            <Breadcrumbs items={[{ label: "Главная", href: "/" }, parent, { label: item.title }]} />
            <header className="publication__header">
              <time className="publication__date" dateTime={date.toISOString()}>
                {new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(date)}
              </time>
              <h1 className="publication__title">{item.title}</h1>
              {item.excerpt && <p className="publication__excerpt">{item.excerpt}</p>}
            </header>
            {item.coverMedia && (
              <Image
                className="publication__cover"
                src={`/api/media/${item.coverMedia.id}`}
                alt={item.coverAlt || item.title}
                width={1200}
                height={675}
                priority
              />
            )}
            <div className="cms publication__body" dangerouslySetInnerHTML={{ __html: safeBody(item.body) }} />
          </div>
        </article>
      </main>
      <Footer
        phone={settings.phone || undefined}
        email={settings.email || undefined}
        address={settings.address || undefined}
        workHours={settings.workHours || undefined}
      />
    </>
  );
}
