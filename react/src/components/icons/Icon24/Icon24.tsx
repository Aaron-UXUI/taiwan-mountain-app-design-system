import type { SVGProps } from "react";
import { GLYPHS_24 } from "../glyphs.generated";
import "../icons.css";

export type Icon24Name = "back" | "close" | "download" | "filter" | "gps-filled" | "gps" | "heart-filled" | "heart" | "map-filled" | "map" | "member-filled" | "member" | "minus" | "more" | "notify-filled" | "notify" | "plus" | "radio-filled" | "radio" | "search-filled" | "search" | "setting";

export type Icon24Props = {
  name: Icon24Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 486:5205. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function Icon24({ name, className, ...rest }: Icon24Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={24}
      height={24}
      className={["tmads-icon", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS_24[name]}
    </svg>
  );
}
