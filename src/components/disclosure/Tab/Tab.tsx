import type { ButtonHTMLAttributes } from "react";
import "./Tab.css";

export type TabSize = "Small" | "Medium" | "Large";

export type TabProps = {
  label?: string;
  active?: boolean;
  size?: TabSize;
  showBadge?: boolean;
  badgeCount?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** Figma: Tab (node 13518:14481) — Active?=Yes/No × Size=Small/Medium/Large. */
export function Tab({
  label = "標題",
  active = true,
  size = "Small",
  showBadge = false,
  badgeCount = "3",
  className,
  ...rest
}: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-active={active}
      className={["tmads-tab", `tmads-tab--${size.toLowerCase()}`, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className="tmads-tab__label">{label}</span>
      {size === "Medium" && showBadge && <span className="tmads-tab__badge">{badgeCount}</span>}
    </button>
  );
}
