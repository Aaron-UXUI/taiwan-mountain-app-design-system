import "./Snackbar.css";

export type SnackbarProps = {
  label?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
};

/** Figma: Snackbar (node 16014:7927) — single component, 2-line snackbar. */
export function Snackbar({
  label = "離線地圖下載完成，現在即使沒有網路連結，也可以查看內洞國家森林遊樂區",
  showCloseButton = true,
  onClose,
  className,
}: SnackbarProps) {
  return (
    <div className={["tmads-snackbar", className].filter(Boolean).join(" ")}>
      <p className="tmads-snackbar__label">{label}</p>
      {showCloseButton && (
        <button
          type="button"
          className="tmads-snackbar__close"
          aria-label="關閉"
          onClick={onClose}
        >
          <svg viewBox="0 0 12 12" fill="none" width="14" height="14" aria-hidden="true">
            <path
              d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5"
              stroke="var(--color-gray-white)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
