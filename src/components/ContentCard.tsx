import Image from "next/image";
import Link from "next/link";

interface ContentCardprops {
  img: string;
  type: "news" | "articles";
  title: string;
  description: string;
  date: string;
  slug: string;
}
export default function ContentCard({
  title,
  img,
  date,
  type,
  slug,
  description,
}: ContentCardprops) {
  return (
    <article className="content-card">
      <Link href={`/${type}/${slug}`} className="content-card__link">
        <div className="content-card__header">
          <Image
            className="content-card__img"
            src={img}
            alt=""
            width={400}
            height={400}
            quality={100}
          />
        </div>
        <div className="content-card__text">
          <h3 className="content-card__title">{title}</h3>
          <p className="content-card__description">{description}</p>
          <span className="content-card__footer">
            <span className="content-card__date">{date}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
