import type { ButtonHTMLAttributes } from "react";
import "./IconButton.css";

export type IconButtonFor = "Location" | "Save" | "OfflineMap";
export type IconButtonType = "Primary" | "Tertiary";
export type IconButtonState =
  | "Default"
  | "Pressing"
  | "Enabled"
  | "Clicked"
  | "Loading"
  | "Downloaded";

/**
 * `Type` is not freely combinable in Figma — each purpose is authored with one
 * emphasis — so it is derived rather than accepted as a prop.
 */
const TYPE_FOR: Record<IconButtonFor, IconButtonType> = {
  Location: "Primary",
  Save: "Tertiary",
  OfflineMap: "Tertiary",
};

/** The states Figma actually defines for each purpose. */
const STATES_FOR: Record<IconButtonFor, IconButtonState[]> = {
  Location: ["Default", "Pressing", "Enabled"],
  Save: ["Default", "Clicked"],
  OfflineMap: ["Default", "Loading", "Downloaded"],
};

export type IconButtonProps = {
  for: IconButtonFor;
  state?: IconButtonState;
  progress?: number;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** GPS crosshair. `Filled?=yes` in Figma is the actively-locating look. */
const GpsGlyph = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 2v3M12 19v3M22 12h-3M5 12H2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r={filled ? 4 : 2.5} fill="currentColor" />
  </svg>
);

const HeartGlyph = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path
      d="M12 20.2C12 20.2 3.5 15.3 3.5 9.3C3.5 6.5 5.7 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.3 4.3 20.5 6.5 20.5 9.3C20.5 15.3 12 20.2 12 20.2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

const DownloadGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path
      d="M12 4V15M12 15L7.5 10.5M12 15L16.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 19H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Figma: Icon Buttons (node 7297:15056) — State × For × Type.
 *
 * Colours come straight from the component: `Type=Primary` is a brand-green
 * circle with a **white** glyph, `Type=Tertiary` is a bare glyph with no
 * background. Save's `Clicked` glyph is white too (it sits over a photo).
 *
 * Figma also defines a `State=Loading...` alongside `State=Loading`; the two
 * render identically in the file, so only `Loading` is implemented.
 */
export function IconButton({
  for: iconFor,
  state = "Default",
  progress = 0,
  className,
  disabled,
  ...rest
}: IconButtonProps) {
  const emphasis = TYPE_FOR[iconFor];
  const classes = [
    "tmads-icon-button",
    `tmads-icon-button--${emphasis.toLowerCase()}`,
    `tmads-icon-button--${iconFor.toLowerCase()}`,
    state === "Pressing" && "tmads-icon-button--pressing",
    state === "Clicked" && "tmads-icon-button--clicked",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (iconFor === "Location") {
    return (
      <button
        type="button"
        className={classes}
        aria-label="定位"
        aria-pressed={state === "Enabled"}
        disabled={disabled}
        {...rest}
      >
        <GpsGlyph filled={state === "Enabled"} />
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
        aria-label={clicked ? "取消收藏" : "加入收藏"}
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

export const ICON_BUTTON_TYPE_FOR = TYPE_FOR;
export const ICON_BUTTON_STATES_FOR = STATES_FOR;
