import type { HTMLAttributes } from "react";
import { CheckBox } from "../../clickable/CheckBox";
import { Badge } from "../../indicators/Badge";
import "./AccordionCheckBox.css";

export type AccordionCheckBoxProps = {
  title?: string;
  expanded?: boolean;
  selected?: boolean;
  selectedCount?: string;
  options?: string[];
  checkedOptions?: string[];
  onToggleExpand?: () => void;
  onOptionChange?: (option: string, checked: boolean) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

const DEFAULT_OPTIONS = [
  "國家森林遊樂區",
  "自然步道",
  "平地森林園區",
  "林業文化園區",
  "林業軌道",
  "自然教育中心",
  "生態教育館",
];

/** Figma: Accordion / CheckBox (node 7813:29373) — Expanded × Selected. */
export function AccordionCheckBox({
  title = "景點類型",
  expanded = false,
  selected = false,
  selectedCount = "0",
  options = DEFAULT_OPTIONS,
  checkedOptions = [],
  onToggleExpand,
  onOptionChange,
  className,
  ...rest
}: AccordionCheckBoxProps) {
  return (
    <div className={["tmads-accordion-checkbox", className].filter(Boolean).join(" ")} {...rest}>
      <button
        type="button"
        className="tmads-accordion-checkbox__title"
        onClick={onToggleExpand}
        aria-expanded={expanded}
      >
        <span className="tmads-accordion-checkbox__title-text">{title}</span>
        {selected && <Badge attribute="Small" for="Accordion" count={selectedCount} />}
        <svg
          className="tmads-accordion-checkbox__chevron"
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
        <div className="tmads-accordion-checkbox__content">
          {options.map((option) => (
            <CheckBox
              key={option}
              id={`accordion-checkbox-${option}`}
              label={option}
              checked={checkedOptions.includes(option)}
              onChange={(event) => onOptionChange?.(option, event.target.checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
