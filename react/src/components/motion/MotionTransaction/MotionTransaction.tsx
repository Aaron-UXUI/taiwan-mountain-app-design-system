import type { HTMLAttributes } from "react";
import "./MotionTransaction.css";

export type MotionTransactionProps = HTMLAttributes<HTMLDivElement>;

const KEYPAD_DOTS = Array.from({ length: 9 }, (_, i) => i);
const INDICATOR_COLORS = ["var(--color-semantic-destruct-600)", "var(--color-accent-yellow-100)", "var(--color-semantic-success-600)"];

/**
 * Figma: Motion / Transaction (node 8512:7478) — 10-frame storyboard of a card
 * being inserted into a payment terminal (from alternating directions) while
 * the screen confirms success partway through. get_design_context returned
 * real illustration assets (payment-terminal + credit-card "Group" vectors)
 * that download_assets could not fetch (permissions error on this file, a
 * known MCP limitation) — the terminal and card below are hand-coded
 * simplified SVG shapes standing in for those illustrations, looped as one
 * continuous CSS keyframe animation rather than a literal 10-step frame swap.
 */
export function MotionTransaction({ className, ...rest }: MotionTransactionProps) {
  return (
    <div className={["tmads-motion-transaction", className].filter(Boolean).join(" ")} role="img" aria-label="交易感應動畫" {...rest}>
      <svg className="tmads-motion-transaction__terminal" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="98" height="148" rx="14" fill="var(--color-gray-black)" />
        <rect x="14" y="14" width="72" height="46" rx="6" className="tmads-motion-transaction__screen" />
        <path
          className="tmads-motion-transaction__check"
          d="M36 38 L47 50 L66 26"
          fill="none"
          stroke="var(--color-gray-white)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
        {KEYPAD_DOTS.map((i) => (
          <rect
            key={i}
            x={16 + (i % 3) * 24}
            y={70 + Math.floor(i / 3) * 16}
            width="18"
            height="10"
            rx="3"
            fill="var(--color-gray-400)"
          />
        ))}
        {INDICATOR_COLORS.map((color, i) => (
          <circle key={color} cx={30 + i * 20} cy="134" r="4" fill={color} />
        ))}
      </svg>
      <svg className="tmads-motion-transaction__card" viewBox="0 0 84 54" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="82" height="52" rx="6" fill="var(--color-gray-200)" stroke="var(--color-gray-400)" />
        <rect x="10" y="12" width="16" height="12" rx="2" fill="var(--color-accent-yellow-100)" />
      </svg>
    </div>
  );
}
