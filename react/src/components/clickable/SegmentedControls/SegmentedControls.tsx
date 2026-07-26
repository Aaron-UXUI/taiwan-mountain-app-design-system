import type { HTMLAttributes } from "react";
import "./SegmentedControls.css";

export type SegmentedControlsSelection = "Left" | "Right";

export type SegmentedControlsProps = {
  leftLabel?: string;
  rightLabel?: string;
  selected?: SegmentedControlsSelection;
  onSelectedChange?: (selected: SegmentedControlsSelection) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">;

/** Figma: Segmented Controls (node 598:6408) — Click=Left/Right. */
export function SegmentedControls({
  leftLabel = "瀏覽數",
  rightLabel = "距離",
  selected = "Left",
  onSelectedChange,
  className,
  ...rest
}: SegmentedControlsProps) {
  return (
    <div className={["tmads-segmented-controls", className].filter(Boolean).join(" ")} {...rest}>
      <div
        className="tmads-segmented-controls__indicator"
        data-position={selected.toLowerCase()}
        aria-hidden="true"
      />
      <button
        type="button"
        className="tmads-segmented-controls__option"
        aria-pressed={selected === "Left"}
        data-selected={selected === "Left"}
        onClick={() => onSelectedChange?.("Left")}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        className="tmads-segmented-controls__option"
        aria-pressed={selected === "Right"}
        data-selected={selected === "Right"}
        onClick={() => onSelectedChange?.("Right")}
      >
        {rightLabel}
      </button>
    </div>
  );
}
