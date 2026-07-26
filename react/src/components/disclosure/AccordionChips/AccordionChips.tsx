import type { HTMLAttributes } from "react";
import { Badge } from "../../indicators/Badge";
import "./AccordionChips.css";

export type AccordionChipsProps = {
  title?: string;
  expanded?: boolean;
  selected?: boolean;
  selectedCount?: string;
  options?: string[];
  onToggleExpand?: () => void;
  onOptionClick?: (option: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const DEFAULT_OPTIONS = ["日出", "賞花", "瀑布", "吊橋", "森林浴", "賞鳥", "賞蝶", "紅葉", "巨木", "雲海", "螢火蟲"];

/** Figma: Accordion / Chips (node 1242:16464) — expanded × selected. */
export function AccordionChips({
  title = "景點主題",
  expanded = false,
  selected = false,
  selectedCount = "0",
  options = DEFAULT_OPTIONS,
  onToggleExpand,
  onOptionClick,
  className,
  ...rest
}: AccordionChipsProps) {
  return (
    <div className={["tmads-accordion-chips", className].filter(Boolean).join(" ")} {...rest}>
      <button
        type="button"
        className="tmads-accordion-chips__title"
        onClick={onToggleExpand}
        aria-expanded={expanded}
      >
        <span className="tmads-accordion-chips__title-text">{title}</span>
        {selected && <Badge attribute="Small" for="Accordion" count={selectedCount} />}
        <svg
          className="tmads-accordion-chips__chevron"
          data-expanded={expanded}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {expanded && (
        <div className="tmads-accordion-chips__row">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="tmads-accordion-chips__chip"
              onClick={() => onOptionClick?.(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
