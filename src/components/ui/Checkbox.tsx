import { cva, VariantProps } from "class-variance-authority";

export const checkboxVariants = cva("checkbox", {
  variants: {
    disabled: {
      true: "_disabled",
    },
  },
});

interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  name,
}: CheckboxProps) {
  return (
    <label className={checkboxVariants({ disabled })}>
      <input
        type="checkbox"
        name={name}
        className="checkbox__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
