import type { HTMLAttributes, ReactNode } from "react";
import { HomeIndicator } from "../HomeIndicator";
import "./Keyboard.css";

export type KeyboardProps = {
  returnKeyLabel?: string;
  spaceKeyLabel?: string;
} & HTMLAttributes<HTMLDivElement>;

const ROW_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const ROW_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const ROW_3 = ["z", "x", "c", "v", "b", "n", "m"];

function Key({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "secondary" | "wide" | "return" }) {
  return <div className={`tmads-keyboard__key tmads-keyboard__key--${variant}`}>{children}</div>;
}

const ShiftGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M12 3L20 12H15V19H9V12H4L12 3Z"
      fill="var(--color-gray-black)"
    />
  </svg>
);

const BackspaceGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d="M8 5H21V19H8L3 12L8 5Z"
      stroke="var(--color-gray-black)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11 9L17 15M17 9L11 15" stroke="var(--color-gray-black)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EmojiGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="var(--color-gray-800)" strokeWidth="1.5" />
    <circle cx="9" cy="10" r="1.1" fill="var(--color-gray-800)" />
    <circle cx="15" cy="10" r="1.1" fill="var(--color-gray-800)" />
    <path d="M8 14.5C9 16 10.4 16.8 12 16.8C13.6 16.8 15 16 16 14.5" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MicGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" fill="var(--color-gray-800)" />
    <path d="M6 11C6 14.3 8.7 17 12 17C15.3 17 18 14.3 18 11" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17V21" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Figma: Keyboard (node 1631:21178) — single component, static iOS keyboard chrome mockup
 * (not a functional input widget). The reference frame also included two absolutely
 * positioned emoji/dictation glyphs layered above the visible key row that don't appear
 * in the rendered screenshot; omitted here since the screenshot shows a single control-strip
 * row (123 / emoji / mic / space / return) as the source of truth.
 */
export function Keyboard({ returnKeyLabel = "搜尋", spaceKeyLabel = "空格", className, ...rest }: KeyboardProps) {
  return (
    <div className={["tmads-keyboard", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-keyboard__row">
        {ROW_1.map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
      </div>
      <div className="tmads-keyboard__row tmads-keyboard__row--offset">
        {ROW_2.map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
      </div>
      <div className="tmads-keyboard__row">
        <div className="tmads-keyboard__key tmads-keyboard__key--secondary tmads-keyboard__key--square">
          <ShiftGlyph />
        </div>
        <div className="tmads-keyboard__letters">
          {ROW_3.map((letter) => (
            <Key key={letter}>{letter}</Key>
          ))}
        </div>
        <div className="tmads-keyboard__key tmads-keyboard__key--secondary tmads-keyboard__key--square">
          <BackspaceGlyph />
        </div>
      </div>
      <div className="tmads-keyboard__control-strip">
        <div className="tmads-keyboard__key tmads-keyboard__key--secondary tmads-keyboard__key--123">123</div>
        <div className="tmads-keyboard__key tmads-keyboard__key--secondary tmads-keyboard__key--square">
          <EmojiGlyph />
        </div>
        <div className="tmads-keyboard__key tmads-keyboard__key--square">
          <MicGlyph />
        </div>
        <Key variant="wide">{spaceKeyLabel}</Key>
        <Key variant="return">{returnKeyLabel}</Key>
      </div>
      <HomeIndicator className="tmads-keyboard__home-indicator" />
    </div>
  );
}
