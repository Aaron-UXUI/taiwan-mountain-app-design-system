import type { HTMLAttributes } from "react";
import "./HomeIndicator.css";

export type HomeIndicatorProps = HTMLAttributes<HTMLDivElement>;

/** Figma: Home Indicator (node 367:21084) — single component, static OS chrome. */
export function HomeIndicator({ className, ...rest }: HomeIndicatorProps) {
  return (
    <div className={["tmads-home-indicator", className].filter(Boolean).join(" ")} {...rest}>
      <span className="tmads-home-indicator__bar" aria-hidden="true" />
    </div>
  );
}
