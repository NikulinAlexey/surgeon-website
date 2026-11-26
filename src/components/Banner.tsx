import type { ReactNode } from "react";
import { cn } from "@/lib/clsx";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  offsetTop?: boolean;
  offsetBottom?: boolean;
  className?: string;
  breadcrumbs?: ReactNode;
}

export default function Banner({
  title,
  subtitle,
  offsetTop,
  offsetBottom,
  backgroundImage,
  className = "",
  breadcrumbs,
}: BannerProps) {
  const style = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

  return (
    <div
      className={cn(className, "banner", {
        "banner--offset-top": offsetTop,
        "banner--offset-bottom": offsetBottom,
      })}
      style={style}
    >
      <div className="banner__container container">
        <div className="banner__body">
          {breadcrumbs}
          <h1 className="banner__title">{title}</h1>
          {subtitle && <p className="banner__subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
