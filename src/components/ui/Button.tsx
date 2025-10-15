interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  type?: "submit" | "button" | "reset";
}
export default function Button({
  children,
  type = "button",
  text,
}: ButtonProps) {
  return (
    <button type={type} className="button">
      {children}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
}
