import type { SVGProps } from "react";
import { GLYPHS_14 } from "../glyphs.generated";
import "../icons.css";

export type Icon14Name = "chevron" | "secured";

export type Icon14Props = {
  name: Icon14Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 507:4429. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function Icon14({ name, className, ...rest }: Icon14Props) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      width={14}
      height={14}
      className={["tmads-icon", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS_14[name]}
    </svg>
  );
}
