import { cn } from "@/lib/clsx";
import SvgIcon from "./SvgIcon";

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onModalClose?: () => void;
}
export default function Modal({
  title,
  isOpen,
  onModalClose,
  children,
}: ModalProps) {
  return (
    <div
      className={cn("modal", {
        _active: isOpen,
      })}
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal__overlay">
        <div className="modal__panel">
          <div className="modal__body">
            <div className="modal__top">
              <h3 className="modal__title">{title}</h3>
              <button
                className="modal__close"
                onClick={onModalClose}
                type="button"
                aria-label="Закрыть модальное окно"
              >
                <SvgIcon name="close" />
              </button>
            </div>
            <div className="modal__content">
              <div className="modal__container">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
