export default function Hero({
  title = "Первая городская клиническая больница им. Е.Е. Волосевич",
  description = "Современная диагностика, квалифицированные врачи и индивидуальный подход к каждому пациенту",
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
