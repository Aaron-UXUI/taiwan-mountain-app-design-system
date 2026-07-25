import type { HTMLAttributes } from "react";
import "./KeyboardNumbers.css";

export type KeyboardNumbersProps = HTMLAttributes<HTMLDivElement>;

const KEYS: Array<{ digit: string; letters: string }> = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
];

const DeleteGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path
      d="M8 5H21V19H8L3 12L8 5Z"
      stroke="var(--color-gray-white)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11 9L17 15M17 9L11 15" stroke="var(--color-gray-white)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Figma: Keyboard - Numbers (node 6272:63852) — single component, static iOS numeric-dialer
 * keyboard chrome mockup (not a functional input widget). The dark translucent Figma
 * background (mixed blend layers) is approximated with a single semi-transparent overlay.
 */
export function KeyboardNumbers({ className, ...rest }: KeyboardNumbersProps) {
  return (
    <div className={["tmads-keyboard-numbers", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-keyboard-numbers__grid">
        {KEYS.map(({ digit, letters }) => (
          <div key={digit} className="tmads-keyboard-numbers__key">
            <span className="tmads-keyboard-numbers__digit">{digit}</span>
            {letters && <span className="tmads-keyboard-numbers__letters">{letters}</span>}
          </div>
        ))}
        <div className="tmads-keyboard-numbers__key tmads-keyboard-numbers__key--symbols">+*#</div>
        <div className="tmads-keyboard-numbers__key">
          <span className="tmads-keyboard-numbers__digit">0</span>
        </div>
        <div className="tmads-keyboard-numbers__key tmads-keyboard-numbers__key--transparent">
          <DeleteGlyph />
        </div>
      </div>
      <div className="tmads-keyboard-numbers__home-indicator">
        <span className="tmads-keyboard-numbers__home-indicator-bar" aria-hidden="true" />
      </div>
    </div>
  );
}
