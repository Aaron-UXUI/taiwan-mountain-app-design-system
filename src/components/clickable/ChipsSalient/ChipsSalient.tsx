import type { HTMLAttributes } from "react";
import "./ChipsSalient.css";

export type ChipsSalientType = "General" | "Special" | "Warning";

export type ChipsSalientProps = {
  label?: string;
  type?: ChipsSalientType;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Chips / Salient (node 12554:9489) — Type=General/Special/Warning. */
export function ChipsSalient({ label = "內容", type = "General", className, ...rest }: ChipsSalientProps) {
  return (
    <div
      className={["tmads-chips-salient", `tmads-chips-salient--${type.toLowerCase()}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {label}
    </div>
  );
}
