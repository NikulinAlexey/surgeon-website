interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export default function Banner({
  title,
  subtitle,
  backgroundImage,
  className = "",
}: BannerProps) {
  const style = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

  return (
    <section className={`banner section ${className}`} style={style}>
      <div className="banner__container container">
        <div className="banner__body">
          <h1 className="banner__title">{title}</h1>
          {subtitle && <p className="banner__subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}