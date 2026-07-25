import type { InputHTMLAttributes } from "react";
import "./CheckBox.css";

export type CheckBoxProps = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

/** Figma: CheckBox (node 7813:28478) — State=Off/On. */
export function CheckBox({ label = "國家森林遊樂區", className, id, ...rest }: CheckBoxProps) {
  return (
    <label className={["tmads-checkbox", className].filter(Boolean).join(" ")} htmlFor={id}>
      <input id={id} type="checkbox" className="tmads-checkbox__input" {...rest} />
      <span className="tmads-checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6.5L4.5 9L10 3"
            stroke="var(--color-gray-white)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="tmads-checkbox__label">{label}</span>
    </label>
  );
}
