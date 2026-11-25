import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
  img?: string;
  imageAlt?: string;
  type: "news" | "articles";
  title: string;
  description: string;
  date: string;
  slug: string;
}

export default function ContentCard({
  title,
  img,
  imageAlt = "",
  date,
  type,
  slug,
  description,
}: ContentCardProps) {
  return (
    <article className="content-card">
      <Link href={`/${type}/${slug}`} className="content-card__link">
        {img && (
          <div className="content-card__header">
            <Image
              className="content-card__img"
              src={img}
              alt={imageAlt}
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="content-card__text">
          <h3 className="content-card__title">{title}</h3>
          <p className="content-card__description">{description}</p>
          <span className="content-card__footer">
            <time className="content-card__date">{date}</time>
          </span>
        </div>
      </Link>
    </article>
  );
}
