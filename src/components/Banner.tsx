import { cn } from "@/lib/clsx";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  offsetTop?: boolean;
  offsetBottom?: boolean;
  className?: string;
}

export default function Banner({
  title,
  subtitle,
  offsetTop,
  offsetBottom,
  backgroundImage,
  className = "",
}: BannerProps) {
  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div
      className={cn(className, `banner`, {
        "banner--offset-top": offsetTop,
        "banner--offset-bottom": offsetBottom,
      })}
      style={style}
    >
      <div className="banner__container container">
        <div className="banner__body">
          <h1 className="banner__title text text--xxl">{title}</h1>
          {subtitle && (
            <p className="banner__subtitle text text--sm text--regular">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
