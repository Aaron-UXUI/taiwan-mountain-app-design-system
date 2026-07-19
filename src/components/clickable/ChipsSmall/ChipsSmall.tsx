import type { HTMLAttributes } from "react";
import "./ChipsSmall.css";

export type ChipsSmallProps = {
  label?: string;
  active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Chips / Small (node 10125:9787) — Active=No/Yes. */
export function ChipsSmall({ label = "內容", active = false, className, ...rest }: ChipsSmallProps) {
  return (
    <div
      className={["tmads-chips-small", active && "tmads-chips-small--active", className]
        .filter(Boolean)
        .join(" ")}
      data-active={active}
      {...rest}
    >
      {label}
    </div>
  );
}
