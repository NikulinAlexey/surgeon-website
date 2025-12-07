import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva("button", {
  variants: {
    variant: {
      primary: "button--theme-primary",
      secondary: "button--theme-secondary",
      ghost: "button--theme-ghost",
      outline: "button--theme-outline",
      "outline-inverted": "button--theme-outline-inverted",
    },
    size: {
      sm: "button--size-sm",
      md: "button--size-md",
      lg: "button--size-lg",
    },
    shape: {
      circle: "button--shape-circle",
    },
    lifted: {
      true: "button--lifted",
    },
    wide: {
      true: "button--wide",
    },
    disabled: {
      true: "_disabled",
    },
  },
});
interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  wide?: boolean;
}

export default function Button({
  children,
  className,
  text,
  variant,
  size = "sm",
  shape,
  lifted,
  wide,
  disabled,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || undefined}
      className={buttonVariants({
        variant,
        size,
        shape,
        lifted,
        wide,
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
