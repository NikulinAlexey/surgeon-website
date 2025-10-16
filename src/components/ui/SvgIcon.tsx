interface SvgIconProps {
  name: string;
  size?: string;
}
export default function SvgIcon({ name, size = "24", ...props }: SvgIconProps) {
  return (
    <svg className="icon" width={size} height={size} {...props}>
      <use xlinkHref={`/sprite/sprite.svg#icon-${name.replace(".svg", "")}`} />
    </svg>
  );
}
