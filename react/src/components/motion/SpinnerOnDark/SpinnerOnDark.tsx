import { SPINNER_DOTS } from "../spinnerDots";
import "../SpinnerOnWhite/SpinnerOnWhite.css";

export type SpinnerOnDarkProps = {
  className?: string;
};

/** White-dot spinner for use on dark backgrounds (e.g. Primary buttons). */
export function SpinnerOnDark({ className }: SpinnerOnDarkProps) {
  return (
    <div className={`tmads-spinner ${className ?? ""}`} role="status" aria-label="Loading">
      {SPINNER_DOTS.map(({ rotation, delay }) => (
        <span
          key={rotation}
          className="tmads-spinner__dot"
          style={{
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${delay}s`,
            backgroundColor: "var(--color-gray-white)",
          }}
        />
      ))}
    </div>
  );
}
