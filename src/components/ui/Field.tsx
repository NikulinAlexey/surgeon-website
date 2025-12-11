import { cn } from "@/lib/clsx";
import React, { useState } from "react";

interface FieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  message?: string;
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
  message,
  placeholder,
  disabled = false,
  onReset,
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);
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
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="field__input"
          placeholder={placeholder}
          disabled={disabled}
        />
        {value && (
          <div className="field__actions">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="field__action"
                disabled={disabled}
              >
                ×
              </button>
            )}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="field__action"
                disabled={disabled}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            )}
          </div>
        )}
      </div>
      {error && <span className="field__message">{error}</span>}
      {message && <span className="field__message ">{message}</span>}
    </div>
  );
}
