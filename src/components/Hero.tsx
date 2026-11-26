import ButtonLink from "./ui/ButtonLink";

export default function Hero({
  title = "Архангельский региональный урологический центр.",
  description = "Первый урологический центр Поморья.",
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__container">
        <div className="hero__body">
          <p className="hero__eyebrow">Первая ГКБ им. Е. Е. Волосевич</p>
          <h1 className="hero__title" id="hero-title">{title}</h1>
          <p className="hero__description">{description}</p>
          <div className="hero__actions">
            <ButtonLink href="/patients" variant="outline-inverted" size="md" text="Пациентам" />
            <ButtonLink href="/contacts" variant="outline" size="md" text="Контакты" />
          </div>
          <div className="hero__facts">
            <div><strong>Консультация и диагностика</strong><span>Информация для пациентов</span></div>
            <div><strong>Региональный центр</strong><span>Архангельская область</span></div>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__medical-card">
            <div className="hero__medical-top">
              <span className="hero__medical-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </span>
              <span>Урологический центр</span>
            </div>
            <svg className="hero__pulse" viewBox="0 0 320 100" fill="none" preserveAspectRatio="none">
              <path d="M0 52h48l12-20 16 42 18-64 20 74 16-32h28l12-18 16 36 14-18h120" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="hero__medical-caption">
              <strong>Профессиональная помощь</strong>
              <span>Диагностика · лечение · сопровождение</span>
            </div>
          </div>
          <div className="hero__floating-card">
            <span className="hero__floating-dot" />
            <div><strong>Информация для пациентов</strong><span>Подготовка к приёму и работа отделений</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
