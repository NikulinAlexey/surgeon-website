export default function Hero({
  title = "Первая городская клиническая больница им. Е.Е. Волосевич",
  description = "Современная диагностика, квалифицированные врачи и индивидуальный подход к каждому пациенту",
}) {
  return (
    <section className={`section hero`}>
      <div className="hero__background"></div>
      <div className="hero__overlay"></div>
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__description">{description}</p>
        </div>
      </div>
    </section>
  );
}
