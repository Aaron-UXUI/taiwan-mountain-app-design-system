import type { InputHTMLAttributes } from "react";
import "./RadioButton.css";

export type RadioButtonStyle = "Default" | "Expanded";

export type RadioButtonProps = {
  label?: string;
  radioStyle?: RadioButtonStyle;
  inputPlaceholder?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "style">;

/** Figma: Radio button (node 816:4968) — click=no/Yes × Style=Default/expanded. */
export function RadioButton({
  label = "個人",
  radioStyle = "Default",
  inputPlaceholder,
  checked,
  id,
  className,
  ...rest
}: RadioButtonProps) {
  return (
    <div className={["tmads-radio-button", className].filter(Boolean).join(" ")}>
      <label className="tmads-radio-button__row" htmlFor={id}>
        <input
          id={id}
          type="radio"
          checked={checked}
          className="tmads-radio-button__input"
          {...rest}
        />
        <span className="tmads-radio-button__circle" aria-hidden="true" />
        <span className="tmads-radio-button__label">{label}</span>
      </label>
      {radioStyle === "Expanded" && checked && (
        <input
          type="text"
          className="tmads-radio-button__expanded-input"
          placeholder={inputPlaceholder}
        />
      )}
    </div>
  );
}
