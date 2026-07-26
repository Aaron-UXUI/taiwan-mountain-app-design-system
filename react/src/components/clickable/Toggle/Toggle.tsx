import type { ButtonHTMLAttributes } from "react";
import "./Toggle.css";

export type ToggleProps = {
  active?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** Figma: Toggles (node 10291:14552) — Active=Yes/No. */
export function Toggle({ active = true, className, ...rest }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      className={["tmads-toggle", active && "tmads-toggle--active", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className="tmads-toggle__handle" />
    </button>
  );
}
