import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { getPublishedContentBySlug, safeBody } from "@/lib/content";
import { getSiteSettings } from "@/lib/pages";
import { ContentKind } from "@/generated/prisma/client";
import { notFound } from "next/navigation";

export async function PublicContentDetail({ slug, kind }: { slug: string; kind: ContentKind }) {
  const [item, settings] = await Promise.all([
    getPublishedContentBySlug(slug),
    getSiteSettings(),
  ]);
  if (!item || item.kind !== kind) notFound();

  const date = item.publishedAt ?? item.updatedAt;
  return (
    <>
      <Header phone={settings.phone || undefined} />
      <main className="layout__main">
        <article className="section">
          <div className="section__container container">
            <Link href={kind === "ARTICLE" ? "/specialists" : "/#news"} className="text">
              ← {kind === "ARTICLE" ? "К статьям" : "К новостям"}
            </Link>
            <header className="publication__header">
              <h1 className="publication__title">{item.title}</h1>
              <time className="publication__date" dateTime={date.toISOString()}>
                {new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(date)}
              </time>
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
      <Footer />
    </>
  );
}
