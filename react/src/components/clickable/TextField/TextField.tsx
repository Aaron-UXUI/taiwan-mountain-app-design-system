import type { InputHTMLAttributes } from "react";
import "./TextField.css";

export type TextFieldState = "Default" | "Typing" | "Typed" | "Error";
export type TextFieldSize = "S" | "M" | "L" | "XL";

export type TextFieldProps = {
  label?: string;
  state?: TextFieldState;
  size?: TextFieldSize;
  errorMsg?: string;
  showIcon?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

/** Figma: Text Field (node 12190:16599) — State=Default/Typing/Typed/Error, also Size=S/M/L/XL. */
export function TextField({
  label = "卡片背面3碼（CVV）",
  state = "Default",
  size = "M",
  errorMsg = "請完整輸入3碼數字",
  showIcon = false,
  placeholder = "Text",
  id,
  className,
  ...rest
}: TextFieldProps) {
  const isError = state === "Error";
  return (
    <div
      className={["tmads-text-field", className].filter(Boolean).join(" ")}
      data-state={state.toLowerCase()}
      data-size={size.toLowerCase()}
    >
      {label && (
        <label className="tmads-text-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="tmads-text-field__input-wrap">
        <input
          id={id}
          type="text"
          className="tmads-text-field__input"
          placeholder={placeholder}
          {...rest}
        />
        {showIcon && (
          <svg
            className="tmads-text-field__icon"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M13.3 13.3L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </div>
      {isError && errorMsg && (
        <div className="tmads-text-field__error">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M8 1.5L14.5 13.5H1.5L8 1.5Z"
              stroke="var(--color-semantic-destruct-700)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M8 6.5V9.5M8 11.5H8.01"
              stroke="var(--color-semantic-destruct-700)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
