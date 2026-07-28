import type { SVGProps } from "react";
import { GLYPHS_MAP } from "../glyphs.generated";
import "../icons.css";

export type IconMapName = "camera" | "info" | "tree" | "walk";

export type IconMapProps = {
  name: IconMapName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

/**
 * Figma: node 11129:12166. The artwork is the real Figma vector, shared with the
 * SwiftUI kit via `glyphs.generated.tsx` — see `scripts/generate-icons.mjs`.
 * Ink is `currentColor`, so a caller can tint the glyph by setting `color`.
 */
export function IconMap({ name, className, ...rest }: IconMapProps) {
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
      {GLYPHS_MAP[name]}
    </svg>
  );
}
