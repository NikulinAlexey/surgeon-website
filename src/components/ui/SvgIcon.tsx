import { cn } from "@/lib/clsx";
import { CSSProperties } from "react";

interface SvgIconProps {
  name: string;
  size?: string;
  className?: string;
  rotateAngle?: string;
}

export default function SvgIcon({
  name,
  className,
  size = "24",
  rotateAngle = "0",
  ...props
}: SvgIconProps) {
  return (
    <svg
      className={cn(className, "icon")}
      style={{ "--icon-rotate-angle": `${rotateAngle}deg` } as CSSProperties}
      width={size}
      height={size}
      {...props}
    >
      <use xlinkHref={`/surgeon-website/sprite/sprite.svg#icon-${name}`} />
    </svg>
  );
}
