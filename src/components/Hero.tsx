import Link from "next/link";
import Button from "./ui/Button";
import ButtonLink from "./ui/ButtonLink";

export default function Hero({
  title = "Архангельский региональный урологический центр.",
  description = "Первый урологический центр Поморья.",
}) {
  return (
    <section className="hero section decorated-bg">
      <div className="hero__container container">
        <div className="hero__body">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__description">{description}</p>
        </div>
      </div>
    </section>
  );
}
