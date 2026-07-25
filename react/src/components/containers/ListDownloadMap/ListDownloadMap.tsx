import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import "./ListDownloadMap.css";

export type ListDownloadMapProps = {
  label?: string;
  showDownloadButton?: boolean;
  onDownload?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  downloadButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: List / DownloadMap (node 13452:15899) — single component. */
export function ListDownloadMap({
  label = "滿月圓國家森林遊樂區",
  showDownloadButton = true,
  onDownload,
  downloadButtonProps,
  className,
  ...rest
}: ListDownloadMapProps) {
  return (
    <div className={["tmads-list-download-map", className].filter(Boolean).join(" ")} {...rest}>
      <span className="tmads-list-download-map__label">{label}</span>
      {showDownloadButton && (
        <button
          type="button"
          className="tmads-list-download-map__button"
          aria-label="下載離線地圖"
          onClick={onDownload}
          {...downloadButtonProps}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"
              stroke="var(--color-gray-black)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
