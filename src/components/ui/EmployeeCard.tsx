import Image from "next/image";

interface EmployeeCardprops {
  img: string;
  title: string;
  description: string;
}
export default function EmployeeCard({
  title,
  img,
  description,
}: EmployeeCardprops) {
  return (
    <article className="content-card content-card--employee">
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
        <h3 className="content-card__title text  text--xl">{title}</h3>
        <p className="content-card__description text">{description}</p>
      </div>
    </article>
  );
}
