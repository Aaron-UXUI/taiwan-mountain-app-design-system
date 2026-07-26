import type { InputHTMLAttributes } from "react";
import { Icon24 } from "../../icons/Icon24";
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
  onChange,
  readOnly,
  id,
  className,
  ...rest
}: RadioButtonProps) {
  // A `checked` input with no `onChange` is a controlled field React cannot
  // update, and it warns about exactly that. Callers that only want to render
  // a fixed state (docs, stories) are legitimate, so mark those read-only
  // rather than making them supply a no-op handler.
  const isReadOnly = readOnly ?? (checked !== undefined && onChange === undefined);
  return (
    <div className={["tmads-radio-button", className].filter(Boolean).join(" ")}>
      <label className="tmads-radio-button__row" htmlFor={id}>
        <input
          id={id}
          type="radio"
          checked={checked}
          onChange={onChange}
          readOnly={isReadOnly}
          className="tmads-radio-button__input"
          {...rest}
        />
        <Icon24
          name={checked ? "radio-filled" : "radio"}
          className="tmads-radio-button__mark"
        />
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
