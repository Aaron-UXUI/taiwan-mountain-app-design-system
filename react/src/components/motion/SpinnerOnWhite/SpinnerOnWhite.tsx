import { SPINNER_DOTS } from "../spinnerDots";
import "./SpinnerOnWhite.css";

export type SpinnerOnWhiteProps = {
  className?: string;
};

/** Dark-dot spinner for use on white/light backgrounds (e.g. Secondary/Tertiary buttons). */
export function SpinnerOnWhite({ className }: SpinnerOnWhiteProps) {
  return (
    <div className={`tmads-spinner ${className ?? ""}`} role="status" aria-label="Loading">
      {SPINNER_DOTS.map(({ rotation, delay }) => (
        <span
          key={rotation}
          className="tmads-spinner__dot"
          style={{
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${delay}s`,
            backgroundColor: "var(--color-primary-green-800)",
          }}
        />
      ))}
    </div>
  );
}
