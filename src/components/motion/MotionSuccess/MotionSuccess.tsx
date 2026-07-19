import type { HTMLAttributes } from "react";
import "./MotionSuccess.css";

export type MotionSuccessProps = HTMLAttributes<HTMLDivElement>;

/**
 * Figma: Motion / Success (node 4188:21162) — 3-frame storyboard (a bare point,
 * a partial stroke, the full checkmark). Reproduced as a single looping CSS
 * stroke-draw animation rather than a literal 3-frame swap, since the source
 * frames are simple enough to hand-code directly.
 */
export function MotionSuccess({ className, ...rest }: MotionSuccessProps) {
  return (
    <div className={["tmads-motion-success", className].filter(Boolean).join(" ")} role="img" aria-label="成功" {...rest}>
      <svg className="tmads-motion-success__circle" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="48" fill="var(--color-semantic-success-600)" />
        <path
          className="tmads-motion-success__check"
          d="M26 50 L42 66 L70 30"
          fill="none"
          stroke="var(--color-gray-white)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
    </div>
  );
}
