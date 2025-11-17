import { cn } from "@/lib/clsx";
import { cva } from "class-variance-authority";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      primary: "button--theme-primary",
      secondary: "button--theme-secondary",
      ghost: "button--theme-ghost",
      outline: "button--theme-outline",
    },
    size: {
      sm: "button--size-sm",
      md: "button--size-md",
      lg: "button--size-lg",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
});
interface ButtonProps extends buttonVariants {
  children?: React.ReactNode;
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  className,
  text,
  size = "sm",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={buttonVariants({
        size,
        disabled,
        className,
      })}
      {...props}
    >
      {children}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
}
