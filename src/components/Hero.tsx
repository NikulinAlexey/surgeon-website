import ButtonLink from "./ui/ButtonLink";

export default function Hero({
  title = "Архангельский региональный урологический центр.",
  description = "Первый урологический центр Поморья.",
}) {
  return (
    <section className="hero section">
      <div className="hero__container container">
        <div className="hero__body">
          <p className="hero__eyebrow">Первая ГКБ им. Е. Е. Волосевич</p>
          <h1 className="hero__title">{title}</h1>
          <p className="hero__description">{description}</p>
          <div className="hero__actions">
            <ButtonLink href="/patients" variant="outline-inverted" size="lg" text="Пациентам" />
            <ButtonLink href="/contacts" variant="outline" size="lg" text="Контакты" />
          </div>
        </div>
      </div>
    </section>
  );
}
