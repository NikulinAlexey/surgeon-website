import { cn } from "@/lib/clsx";
import Link from "next/link";

interface ButtonProps {
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
  ...props
}: ButtonProps) {
  return (
    <Link className={cn("button", className)} {...props}>
      {children}
      {text && <span className="button__text">{text}</span>}
    </Link>
  );
}
