import type { AnchorHTMLAttributes } from "react";
import "./LinkFurtherInfo.css";

export type LinkFurtherInfoProps = {
  label?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Figma: Link / Further Info (node 11167:23076) — 單一元件. */
export function LinkFurtherInfo({ label = "更多資訊", className, ...rest }: LinkFurtherInfoProps) {
  return (
    <a className={["tmads-link-further-info", className].filter(Boolean).join(" ")} {...rest}>
      <span>{label}</span>
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
        <path
          d="M5 11L11 5M11 5H6M11 5V10"
          stroke="var(--color-primary-green-800)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
