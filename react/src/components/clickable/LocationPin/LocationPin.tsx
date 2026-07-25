import type { HTMLAttributes } from "react";
import "./LocationPin.css";

export type LocationPinState = "Default" | "Focused";
export type LocationPinType = "Default" | "Info";

export type LocationPinProps = {
  label?: string;
  state?: LocationPinState;
  type?: LocationPinType;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Location Pin (node 11129:12159) — State=Default/Focused × Type=Default/Info. */
export function LocationPin({
  label = "內洞國家森林遊樂區",
  state = "Default",
  type = "Default",
  className,
  ...rest
}: LocationPinProps) {
  const isFocused = state === "Focused";
  return (
    <div
      className={[
        "tmads-location-pin",
        `tmads-location-pin--${type.toLowerCase()}`,
        isFocused && "tmads-location-pin--focused",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <p className="tmads-location-pin__label">{label}</p>
      <div className="tmads-location-pin__badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="60%" height="60%">
          <path
            d="M4 8.5C4 7.67 4.67 7 5.5 7H8L9 5.5H15L16 7H18.5C19.33 7 20 7.67 20 8.5V17C20 17.83 19.33 18.5 18.5 18.5H5.5C4.67 18.5 4 17.83 4 17V8.5Z"
            stroke="var(--color-gray-white)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12.5" r="3" stroke="var(--color-gray-white)" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
}
