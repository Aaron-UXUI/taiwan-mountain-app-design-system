import type { ButtonHTMLAttributes } from "react";
import "./ChipsLarge.css";

export type ChipsLargeProps = {
  label?: string;
  selected?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** Figma: Chips / Large (node 812:5259) — state=no/yes. */
export function ChipsLarge({ label = "景點", selected = false, className, ...rest }: ChipsLargeProps) {
  return (
    <button
      type="button"
      className={["tmads-chips-large", selected && "tmads-chips-large--selected", className]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={selected}
      {...rest}
    >
      {label}
    </button>
  );
}
