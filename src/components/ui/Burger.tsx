import { cn } from "@/lib/clsx";

interface ButtonProps {
  isBurgerClicked: boolean;
  onClick: (e: React.MouseEvent) => void;
}
export default function Button({ isBurgerClicked, onClick }: ButtonProps) {
  return (
    <button
      aria-label={
        isBurgerClicked ? "Закрыть меню навигации" : "Открыть меню навигации"
      }
      className={cn("burger", {
        _active: isBurgerClicked,
      })}
      onClick={(e: React.MouseEvent) => onClick(e)}
    >
      <span className="burger__slice" />
    </button>
  );
}
