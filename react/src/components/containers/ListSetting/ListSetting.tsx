import type { ButtonHTMLAttributes } from "react";
import "./ListSetting.css";

export type ListSettingProps = {
  text?: string;
  showChevron?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Figma: List / Setting (node 493:1903) — single component. */
export function ListSetting({
  text = "管理登入方式",
  showChevron = true,
  className,
  type = "button",
  ...rest
}: ListSettingProps) {
  return (
    <button className={["tmads-list-setting", className].filter(Boolean).join(" ")} type={type} {...rest}>
      <span className="tmads-list-setting__text">{text}</span>
      {showChevron && (
        <svg className="tmads-list-setting__chevron" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M5 2.5L9.5 7L5 11.5"
            stroke="var(--color-gray-black)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
