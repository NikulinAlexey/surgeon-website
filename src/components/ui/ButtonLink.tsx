import Link from "next/link";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./Button";

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  text?: string;
  href: string;
  className?: string;
  onClick?: () => void;
}
export default function ButtonLink({
  children,
  className,
  text,
  variant,
  size = "sm",
  shape,
  wide,
  lifted,
  disabled,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonVariants({
        variant,
        size,
        shape,
        wide,
        lifted,
        disabled,
        className,
      })}
      {...props}
    >
      {children}
      {text && <span className="button__text">{text}</span>}
    </Link>
  );
}
