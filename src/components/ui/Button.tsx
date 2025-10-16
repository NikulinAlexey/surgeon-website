import { cn } from "@/lib/clsx";

interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  type?: "submit" | "button" | "reset";
  className?: string;
}
export default function Button({
  children,
  className,
  type = "button",
  text,
}: ButtonProps) {
  return (
    <button type={type} className={cn("button", className)}>
      {children}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
}
