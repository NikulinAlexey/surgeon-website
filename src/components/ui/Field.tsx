import { cn } from "@/lib/clsx";
import React, { useState } from "react";

interface FieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  variant?: "primary";
  message?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  onReset?: () => void;
}

export default function Field({
  label,
  type,
  id,
  name,
  value,
  onChange,
  variant,
  error,
  message,
  placeholder,
  disabled = false,
  required = false,
  autoComplete,
  onReset,
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error || message);

  return (
    <div className={cn("field", { "field--primary": variant === "primary", "field--error": error })}>
      <label htmlFor={id} className="field__label">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="field__input-wrapper">
        <input
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="field__input"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={hasMessage ? messageId : undefined}
        />
        <div className="field__actions">
          {onReset && value && (
            <button type="button" onClick={onReset} className="field__action field__action--icon" disabled={disabled} aria-label={`Очистить поле «${label}»`}>
              ×
            </button>
          )}
          {type === "password" && value && (
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="field__action field__action--text"
              disabled={disabled}
              aria-pressed={showPassword}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          )}
        </div>
      </div>
      {hasMessage && (
        <span id={messageId} className="field__message" role={error ? "alert" : undefined}>
          {error || message}
        </span>
      )}
    </div>
  );
}
