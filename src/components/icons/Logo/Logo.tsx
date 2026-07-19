import type { HTMLAttributes } from "react";
import "./Logo.css";

export type LogoSize = "Large" | "Small";

export type LogoProps = {
  size?: LogoSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/** Figma: Logo (node 12649:28641) — App wordmark, Large/Small. Reproduced as a text lockup since the source is a flattened vector asset this project has no download access to. */
export function Logo({ size = "Large", className, ...rest }: LogoProps) {
  return (
    <span
      className={["tmads-logo", `tmads-logo--${size.toLowerCase()}`, className].filter(Boolean).join(" ")}
      role="img"
      aria-label="台灣山林"
      {...rest}
    >
      台灣山林
    </span>
  );
}
