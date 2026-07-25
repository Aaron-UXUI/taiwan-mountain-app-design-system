import type { ButtonHTMLAttributes } from "react";
import "./IconButton.css";

export type IconButtonFor = "Location" | "Save" | "OfflineMap";
export type IconButtonState = "Default" | "Pressing" | "Clicked" | "Loading" | "Downloaded";

export type IconButtonProps = {
  for: IconButtonFor;
  state?: IconButtonState;
  progress?: number;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const LocationGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="var(--color-gray-white)" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="2.5" fill="var(--color-gray-white)" />
  </svg>
);

const HeartGlyph = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path
      d="M12 20.2C12 20.2 3.5 15.3 3.5 9.3C3.5 6.5 5.7 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.3 4.3 20.5 6.5 20.5 9.3C20.5 15.3 12 20.2 12 20.2Z"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? "var(--color-gray-800)" : "none"}
    />
  </svg>
);

const DownloadGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path
      d="M12 4V15M12 15L7.5 10.5M12 15L16.5 10.5"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 19H19" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Figma: Icon Buttons (node 7297:15056) — State × For=Location/Save/OfflineMap × Type. */
export function IconButton({
  for: iconFor,
  state = "Default",
  progress = 0,
  className,
  disabled,
  ...rest
}: IconButtonProps) {
  const classes = ["tmads-icon-button", `tmads-icon-button--${iconFor.toLowerCase()}`, className]
    .filter(Boolean)
    .join(" ");

  if (iconFor === "Location") {
    return (
      <button
        type="button"
        className={[classes, state === "Pressing" && "tmads-icon-button--pressing"]
          .filter(Boolean)
          .join(" ")}
        aria-label="定位"
        disabled={disabled}
        {...rest}
      >
        <LocationGlyph />
      </button>
    );
  }

  if (iconFor === "Save") {
    const clicked = state === "Clicked";
    return (
      <button
        type="button"
        className={classes}
        aria-pressed={clicked}
        aria-label="收藏"
        disabled={disabled}
        {...rest}
      >
        <HeartGlyph filled={clicked} />
      </button>
    );
  }

  if (state === "Loading") {
    return (
      <button type="button" className={classes} disabled aria-label="下載中" {...rest}>
        {Math.round(progress)}%
      </button>
    );
  }

  if (state === "Downloaded") {
    return (
      <button type="button" className={classes} disabled aria-label="已下載" {...rest}>
        已下載
      </button>
    );
  }

  return (
    <button type="button" className={classes} aria-label="離線地圖下載" disabled={disabled} {...rest}>
      <DownloadGlyph />
    </button>
  );
}
