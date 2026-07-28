import type { SVGProps } from "react";
import { GLYPHS_20 } from "../glyphs.generated";
import "../icons.css";

export type Icon20Name = "check" | "close-eye" | "credit-card" | "info" | "microphone" | "open-eye" | "search";

export type Icon20Props = {
  name: Icon20Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 490:21891. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function Icon20({ name, className, ...rest }: Icon20Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      width={20}
      height={20}
      className={["tmads-icon", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS_20[name]}
    </svg>
  );
}
