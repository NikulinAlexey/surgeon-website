import { cn } from "@/lib/clsx";

interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  type?: "submit" | "button" | "reset";
  className?: string;
  onClick?: () => void;
}
export default function Button({
  children,
  className,
  type = "button",
  text,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={cn("button", className)}>
      {children}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
}
