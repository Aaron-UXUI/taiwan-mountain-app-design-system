import type { HTMLAttributes } from "react";
import { CheckBoxNavigation } from "../CheckBoxNavigation";
import "./NavigationBar.css";

export type NavigationBarState = "activity" | "map" | "notify" | "member";

export type NavigationBarProps = {
  state?: NavigationBarState;
  onTabClick?: (tab: NavigationBarState) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const SearchGlyph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth={active ? 2.4 : 1.6} />
    <path d="M20 20L15.8 15.8" stroke="currentColor" strokeWidth={active ? 2.4 : 1.6} strokeLinecap="round" />
  </svg>
);

const MapGlyph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? "currentColor" : "none"} aria-hidden="true">
    <path
      d="M9 4L4 6V20L9 18L15 20L20 18V4L15 6L9 4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 4V18M15 6V20" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const BellGlyph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? "currentColor" : "none"} aria-hidden="true">
    <path
      d="M6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10V14L20 17H4L6 14V10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9.5 20C10 20.9 10.9 21.5 12 21.5C13.1 21.5 14 20.9 14.5 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const MemberGlyph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill={active ? "currentColor" : "none"} />
    <circle cx="12" cy="9.5" r="3" fill={active ? "var(--color-gray-white)" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth="1.6" />
    <path
      d="M6 18.5C6.9 16 9.2 14.5 12 14.5C14.8 14.5 17.1 16 18 18.5"
      fill="none"
      stroke={active ? "var(--color-gray-white)" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const TABS: Array<{ key: NavigationBarState; label: string; Icon: (props: { active: boolean }) => JSX.Element }> = [
  { key: "activity", label: "探索", Icon: SearchGlyph },
  { key: "map", label: "地圖", Icon: MapGlyph },
  { key: "notify", label: "消息", Icon: BellGlyph },
  { key: "member", label: "會員", Icon: MemberGlyph },
];

/** Figma: Navigation Bar (node 490:22853) — state=activity/map/notify/member. */
export function NavigationBar({ state = "activity", onTabClick, className, ...rest }: NavigationBarProps) {
  return (
    <div className={["tmads-navigation-bar", className].filter(Boolean).join(" ")} {...rest}>
      {TABS.map(({ key, label, Icon }) => {
        const active = state === key;
        const isNotifyTab = key === "notify";
        return (
          <CheckBoxNavigation
            key={key}
            label={label}
            active={active}
            icon={<Icon active={active} />}
            badge={isNotifyTab ? (state === "notify" ? "dot" : "count") : "none"}
            onClick={() => onTabClick?.(key)}
          />
        );
      })}
    </div>
  );
}
