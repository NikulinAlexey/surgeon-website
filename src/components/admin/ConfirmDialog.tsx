"use client";

import Modal from "@/components/ui/Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  danger?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  danger = false,
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal id="admin-confirm" title={title} description={description} isOpen={isOpen} onModalClose={onClose}>
      <p className="admin-dialog__text">{description}</p>
      <div className="admin-dialog__actions">
        <button type="button" className="admin-button" onClick={onClose} disabled={isLoading}>Отмена</button>
        <button
          type="button"
          className={`admin-button ${danger ? "admin-button--danger" : "admin-button--primary"}`}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Выполняем…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
