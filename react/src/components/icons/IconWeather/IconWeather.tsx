import type { SVGProps } from "react";
import { GLYPHS_WEATHER } from "../glyphs.generated";
import "../icons.css";

export type IconWeatherName = "cloud-snow" | "cloud-sun" | "lightning-rain" | "rain" | "sunny" | "typhoon" | "windy";

export type IconWeatherProps = {
  name: IconWeatherName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 1743:13737. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function IconWeather({ name, className, ...rest }: IconWeatherProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={24}
      height={24}
      className={["tmads-icon tmads-icon--weather", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS_WEATHER[name]}
    </svg>
  );
}
