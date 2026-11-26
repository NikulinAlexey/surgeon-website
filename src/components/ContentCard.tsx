import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
  img?: string;
  imageAlt?: string;
  type: "news" | "articles";
  title: string;
  description: string;
  date: string;
  dateTime: string;
  slug: string;
}

export default function ContentCard({
  title,
  img,
  imageAlt = "",
  date,
  dateTime,
  type,
  slug,
  description,
}: ContentCardProps) {
  return (
    <article className="content-card">
      <Link href={`/${type}/${slug}`} className="content-card__link">
        {img ? (
          <div className="content-card__header">
            <Image className="content-card__img" src={img} alt={imageAlt} width={400} height={300} />
          </div>
        ) : (
          <div className="content-card__placeholder" aria-hidden="true">
            <span>{type === "news" ? "Новости центра" : "Статьи специалистов"}</span>
          </div>
        )}
        <div className="content-card__text">
          <time className="content-card__date" dateTime={dateTime}>{date}</time>
          <h3 className="content-card__title">{title}</h3>
          <p className="content-card__description">{description}</p>
          <span className="content-card__more">Читать <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
