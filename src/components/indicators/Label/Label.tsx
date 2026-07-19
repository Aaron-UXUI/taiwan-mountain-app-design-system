import "./Label.css";

export type LabelState = "Open" | "Partial" | "Close" | "family";

const DEFAULT_TEXT: Record<LabelState, string> = {
  Open: "今日開放",
  Partial: "部分開放",
  Close: "暫停開放",
  family: "親子友善",
};

export type LabelProps = {
  state?: LabelState;
  label?: string;
  className?: string;
};

/** Figma: Label (node 9037:15126) — State=Open/Partial/Close/family (variant name as-authored in Figma). */
export function Label({ state = "Open", label, className }: LabelProps) {
  return (
    <div
      className={["tmads-label", `tmads-label--${state.toLowerCase()}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {label ?? DEFAULT_TEXT[state]}
    </div>
  );
}
