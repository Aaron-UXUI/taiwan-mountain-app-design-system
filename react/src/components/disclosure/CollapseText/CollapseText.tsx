import type { HTMLAttributes } from "react";
import "./CollapseText.css";

export type CollapseTextProps = {
  text?: string;
  expanded?: boolean;
  onToggle?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onToggle">;

const DEFAULT_TEXT =
  "瀑聲隆隆，依山傍水的蕨類樂園，小巧精緻的內洞國家森林遊樂區，是南勢溪上游一個享受寧靜與綠意的好所在。距新店約50分鐘，內洞可說是大台北地區交通最方便的國家森林遊樂區，海拔在230~800公尺之間，被內洞溪流貫，潮濕而溫暖，是名副其實的蕨類樂園。";

/** Figma: Collapse / Text (node 502:1918) — Expanded?=No/Yes. */
export function CollapseText({
  text = DEFAULT_TEXT,
  expanded = false,
  onToggle,
  className,
  ...rest
}: CollapseTextProps) {
  return (
    <div className={["tmads-collapse-text", className].filter(Boolean).join(" ")} {...rest}>
      <p
        className={[
          "tmads-collapse-text__body",
          !expanded && "tmads-collapse-text__body--clamped",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {text}
      </p>
      <button
        type="button"
        className="tmads-collapse-text__toggle"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {expanded ? "收合" : "閱讀全文"}
        <svg
          className="tmads-collapse-text__chevron"
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
    </div>
  );
}
