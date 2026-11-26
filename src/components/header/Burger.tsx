import { cn } from "@/lib/clsx";

interface ButtonProps {
  isBurgerClicked: boolean;
  onClick: (event: React.MouseEvent) => void;
}

export default function Burger({ isBurgerClicked, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={isBurgerClicked ? "Закрыть меню навигации" : "Открыть меню навигации"}
      aria-expanded={isBurgerClicked}
      aria-controls="main-navigation"
      className={cn("burger", { _active: isBurgerClicked })}
      onClick={onClick}
    >
      <span className="burger__slice" />
    </button>
  );
}
