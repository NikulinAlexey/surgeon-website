import { cn } from "@/lib/clsx";
import React from "react";

interface FieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  onReset?: () => void;
}

export default function Field({
  label,
  type,
  id,
  name,
  value,
  onChange,
  error,
  hint,
  placeholder,
  disabled = false,
  onReset,
}: FieldProps) {
  return (
    <div
      className={cn("field", {
        "field--error": error,
      })}
    >
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <div className="field__input-wrapper">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="field__input"
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className="field__actions">
          {onReset && value && (
            <button
              type="button"
              onClick={onReset}
              className="field__action"
              disabled={disabled}
            >
              ×
            </button>
          )}
          {type === "password" && value && (
            <button type="button" className="field__action" disabled={disabled}>
              👀
            </button>
          )}
        </div>
      </div>
      <span className="field__hint">{error}</span>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}
