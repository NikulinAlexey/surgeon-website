import { cn } from "@/lib/clsx";
import SvgIcon from "./SvgIcon";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  children?: ReactNode;
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

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add("_locked");
    } else {
      body.classList.remove("_locked");
    }
  }, [isOpen]);
  return (
    <div
      className={cn("modal", {
        _opened: isOpen,
      })}
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal__overlay">
        <div className="modal__panel">
          <div className="modal__area">
            <div className="modal__body">
              <div className="modal__top">
                <h3 className="modal__title">{title}</h3>
                <button
                  className="modal__close"
                  onClick={onModalClose}
                  type="button"
                  aria-label="Закрыть модальное окно"
                >
                  <SvgIcon name="close" />x
                </button>
              </div>
              <div className="modal__content">
                <div className="modal__container">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
