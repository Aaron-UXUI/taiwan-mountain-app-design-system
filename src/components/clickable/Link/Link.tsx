import type { AnchorHTMLAttributes } from "react";
import "./Link.css";

export type LinkProps = {
  label?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Figma: Link (node 12469:18515) — 單一元件. */
export function Link({ label = "服務條款", className, ...rest }: LinkProps) {
  return (
    <a className={["tmads-link", className].filter(Boolean).join(" ")} {...rest}>
      {label}
    </a>
  );
}
