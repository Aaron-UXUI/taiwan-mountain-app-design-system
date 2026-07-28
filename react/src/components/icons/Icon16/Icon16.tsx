import type { SVGProps } from "react";
import { GLYPHS_16 } from "../glyphs.generated";
import "../icons.css";

export type Icon16Name = "arrow-up-right" | "exclamation" | "heart-filled" | "heart" | "non-notified" | "notified";

export type Icon16Props = {
  name: Icon16Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 10787:61593. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function Icon16({ name, className, ...rest }: Icon16Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      width={16}
      height={16}
      className={["tmads-icon", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS_16[name]}
    </svg>
  );
}
