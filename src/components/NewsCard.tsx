import Image from "next/image";
import Link from "next/link";

interface NewsCardprops {
  img: string;
  title: string;
  description: string;
  link: string;
  date: string;
}
export default function NewsCard({
  title,
  img,
  link,
  date,
  description,
}: NewsCardprops) {
  return (
    <article className="news-card">
      <Link href={link} className="news-card__link">
        <div className="news-card__header">
          <Image
            className="news-card__img"
            src={img}
            alt=""
            width={100}
            height={80}
            quality={100}
          />
        </div>
        <div className="news-card__text">
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
          <span className="news-card__footer">{date}</span>
        </div>
      </Link>
    </article>
  );
}
