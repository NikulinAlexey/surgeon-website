import Image from "next/image";

interface ContentPageprops {
  img: string;
  title: string;
  description: string;
  date: string;
}
export default function ContentPage({
  title,
  img,
  date,
  description,
}: ContentPageprops) {
  return (
    <article className="content-card">
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
    </article>
  );
}
