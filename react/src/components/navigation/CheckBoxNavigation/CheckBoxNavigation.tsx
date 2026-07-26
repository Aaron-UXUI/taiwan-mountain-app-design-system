import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Badge } from "../../indicators/Badge";
import "./CheckBoxNavigation.css";

export type CheckBoxNavigationBadge = "none" | "dot" | "count";

export type CheckBoxNavigationProps = {
  label?: string;
  active?: boolean;
  badge?: CheckBoxNavigationBadge;
  badgeCount?: string;
  icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const SearchGlyph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth={active ? 2.4 : 1.6} />
    <path d="M20 20L15.8 15.8" stroke="currentColor" strokeWidth={active ? 2.4 : 1.6} strokeLinecap="round" />
  </svg>
);

/**
 * Figma: CheckBox/Navigation (node 355:60400) — single component, default icon = search/探索.
 * `icon` can be overridden so other bottom-tab components (e.g. BottomBar, NavigationBar)
 * can reuse this same item shell with their own glyph.
 */
export function CheckBoxNavigation({
  label = "探索",
  active = false,
  badge = "none",
  badgeCount = "3",
  icon,
  className,
  ...rest
}: CheckBoxNavigationProps) {
  return (
    <button
      type="button"
      className={["tmads-checkbox-navigation", className].filter(Boolean).join(" ")}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {active && <span className="tmads-checkbox-navigation__indicator" aria-hidden="true" />}
      <span className="tmads-checkbox-navigation__icon" data-active={active}>
        {icon ?? <SearchGlyph active={active} />}
      </span>
      <span className="tmads-checkbox-navigation__label" data-active={active}>
        {label}
      </span>
      {badge !== "none" && (
        <span className="tmads-checkbox-navigation__badge">
          <Badge attribute={badge === "dot" ? "Small" : "Large"} for="Notification" count={badgeCount} />
        </span>
      )}
    </button>
  );
}
