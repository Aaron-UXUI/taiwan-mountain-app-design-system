import "./ProgressIndicator.css";

export type ProgressIndicatorStep = "Choice" | "Method" | "Info";

export type ProgressIndicatorProps = {
  step?: ProgressIndicatorStep;
  labels?: [string, string, string];
  className?: string;
};

const STEP_ORDER: ProgressIndicatorStep[] = ["Choice", "Method", "Info"];

/** Figma: Progress Indicator (node 1274:20052) — 進度=Choice/Method/Info. */
export function ProgressIndicator({
  step = "Choice",
  labels = ["選擇票券", "付款方式", "付款資訊"],
  className,
}: ProgressIndicatorProps) {
  const activeIndex = STEP_ORDER.indexOf(step);

  return (
    <div className={["tmads-progress-indicator", className].filter(Boolean).join(" ")}>
      {labels.map((label, index) => (
        <div className="tmads-progress-indicator__segment" key={label}>
          <span
            className="tmads-progress-indicator__step"
            data-active={index === activeIndex}
          >
            {label}
          </span>
          {index < labels.length - 1 && (
            <span className="tmads-progress-indicator__line" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
