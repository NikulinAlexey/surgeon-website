import { cn } from "@/lib/clsx";
import { ReactNode, useEffect, useRef } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Button from "./Button";

interface ModalProps {
  id: string;
  children?: ReactNode;
  title?: string;
  description?: string; // Добавил для описания
  isOpen: boolean;
  onModalClose?: () => void;
  closeOnOverlayClick?: boolean; // Опция для закрытия по оверлею
  closeOnEsc?: boolean; // Опция для закрытия по ESC
  initialFocusRef?: React.RefObject<HTMLElement>; // Для фокуса при открытии
}

export default function Modal({
  id,
  title,
  description,
  isOpen,
  onModalClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocusRef,
}: ModalProps) {
  useLockBodyScroll(isOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `${id}-modal-title`;
  const descriptionId = `${id}-modal-description`;

  // Закрытие по ESC
  useEffect(() => {
    if (!isOpen || !closeOnEsc || !onModalClose) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onModalClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onModalClose]);

  // Управление фокусом
  useEffect(() => {
    if (!isOpen) return;

    // Сохраняем элемент, который был в фокусе до открытия модалки
    const previouslyFocused = document.activeElement as HTMLElement;

    // Устанавливаем фокус
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Возвращаем фокус при закрытии
    return () => {
      if (previouslyFocused?.focus) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, initialFocusRef]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (
      closeOnOverlayClick &&
      event.target === event.currentTarget &&
      onModalClose
    ) {
      onModalClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={cn("modal", {
        _opened: isOpen,
      })}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal__overlay" onClick={handleOverlayClick}>
        <div className="modal__panel">
          <div className="modal__area">
            <div className="modal__body">
              <div className="modal__top">
                {title && (
                  <h3 className="modal__title text text--lg" id={titleId}>
                    {title}
                  </h3>
                )}

                {description && (
                  <p className="modal__description sr-only" id={descriptionId}>
                    {description}
                  </p>
                )}

                <Button
                  className="modal__close"
                  onClick={onModalClose}
                  aria-label="Закрыть модальное окно"
                  variant="close"
                />
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
