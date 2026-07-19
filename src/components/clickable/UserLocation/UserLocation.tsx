import type { HTMLAttributes } from "react";
import "./UserLocation.css";

export type UserLocationProps = HTMLAttributes<HTMLDivElement>;

/**
 * Figma: User Location (node 12846:34701) — 單一元件, map marker showing the
 * user's facing direction as a soft gradient cone above a solid pin dot.
 * The cone was a raster fill in Figma with no editor access to export it
 * (download_assets requires edit permission on this file), so it's rebuilt
 * here as a CSS gradient instead of an inline SVG trace.
 */
export function UserLocation({ className, ...rest }: UserLocationProps) {
  return (
    <div className={["tmads-user-location", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-user-location__direction" aria-hidden="true" />
      <div className="tmads-user-location__pin" aria-hidden="true" />
    </div>
  );
}
