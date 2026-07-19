import type { HTMLAttributes } from "react";
import "./StatusBar.css";

export type StatusBarProps = {
  time?: string;
} & HTMLAttributes<HTMLDivElement>;

const SignalGlyph = () => (
  <svg viewBox="0 0 18 12" width="18" height="12" fill="none" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="0.5" fill="var(--color-gray-black)" />
    <rect x="5" y="6" width="3" height="6" rx="0.5" fill="var(--color-gray-black)" />
    <rect x="10" y="3" width="3" height="9" rx="0.5" fill="var(--color-gray-black)" />
    <rect x="15" y="0" width="3" height="12" rx="0.5" fill="var(--color-gray-black)" />
  </svg>
);

const WifiGlyph = () => (
  <svg viewBox="0 0 18 13" width="18" height="13" fill="none" aria-hidden="true">
    <path
      d="M9 11.5C9.6 11.5 10 11.1 10 10.5C10 9.9 9.6 9.5 9 9.5C8.4 9.5 8 9.9 8 10.5C8 11.1 8.4 11.5 9 11.5Z"
      fill="var(--color-gray-black)"
    />
    <path
      d="M5.3 7.8C6.3 6.9 7.6 6.4 9 6.4C10.4 6.4 11.7 6.9 12.7 7.8"
      stroke="var(--color-gray-black)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M2.3 4.7C4.3 2.9 6.6 2 9 2C11.4 2 13.7 2.9 15.7 4.7"
      stroke="var(--color-gray-black)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const BatteryGlyph = () => (
  <svg viewBox="0 0 25 12" width="25" height="12" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="var(--color-gray-black)" opacity="0.4" />
    <rect x="2" y="2" width="18" height="8" rx="1.5" fill="var(--color-gray-black)" />
    <rect x="22.5" y="4" width="1.5" height="4" rx="0.75" fill="var(--color-gray-black)" opacity="0.4" />
  </svg>
);

/**
 * Figma: Status bar / Default (node 309:5865) — single component, static OS chrome mockup.
 * The Figma "StateIcon" group (signal/wifi/battery glyphs) references a temporary MCP
 * asset image; reproduced here as hand-coded inline SVGs instead of downloading.
 */
export function StatusBar({ time = "10:08", className, ...rest }: StatusBarProps) {
  return (
    <div className={["tmads-status-bar", className].filter(Boolean).join(" ")} {...rest}>
      <p className="tmads-status-bar__time">{time}</p>
      <div className="tmads-status-bar__icons" aria-hidden="true">
        <SignalGlyph />
        <WifiGlyph />
        <BatteryGlyph />
      </div>
    </div>
  );
}
