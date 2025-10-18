import { CSSProperties } from "react";

interface SvgIconProps {
  name: string;
  size?: string;
  rotateAngle?: string;
}

export default function SvgIcon({
  name,
  size = "24",
  rotateAngle,
  ...props
}: SvgIconProps) {
  return (
    <svg
      className="icon"
      style={{ "--icon-rotate-angle": `${rotateAngle}deg` } as CSSProperties}
      width={size}
      height={size}
      {...props}
    >
      <use xlinkHref={`/sprite/sprite.svg#icon-${name}`} />
    </svg>
  );
}
