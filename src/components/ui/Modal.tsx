import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Button from "./Button";

interface ModalProps {
  id: string;
  children?: ReactNode;
  title?: string;
  description?: string;
  isOpen: boolean;
  onModalClose?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
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
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onModalClose);
  const titleId = `${id}-modal-title`;
  const descriptionId = `${id}-modal-description`;

  useEffect(() => { onCloseRef.current = onModalClose; }, [onModalClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const target = initialFocusRef?.current || closeButtonRef.current?.querySelector<HTMLElement>("button");
    target?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc && onCloseRef.current) {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])",
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, closeOnEsc, initialFocusRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="modal _opened"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal__overlay"
        onClick={(event) => {
          if (closeOnOverlayClick && event.target === event.currentTarget) onModalClose?.();
        }}
      >
        <div className="modal__panel">
          <div className="modal__area">
            <div className="modal__body">
              <div className="modal__top">
                {title && <h2 className="modal__title text text--lg" id={titleId}>{title}</h2>}
                {description && <p className="sr-only" id={descriptionId}>{description}</p>}
                <div className="modal__close" ref={closeButtonRef}>
                  <Button onClick={onModalClose} aria-label="Закрыть модальное окно" variant="close" />
                </div>
              </div>
              <div className="modal__content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
