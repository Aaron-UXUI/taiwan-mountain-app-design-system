import type { HTMLAttributes } from "react";
import "./Logos.css";

export type LogosName =
  | "credit-card"
  | "mastercard"
  | "jcb"
  | "line-pay"
  | "google-pay"
  | "apple-pay"
  | "apple"
  | "google"
  | "facebook"
  | "cht"
  | "taiwan-mobile"
  | "fet";

export type LogosProps = {
  name: LogosName;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/**
 * These render as plain text/monogram badges, not the real brand marks.
 * Figma shows the actual trademarked logos (Visa, Mastercard, Apple, Google,
 * Facebook, telecom carrier marks) for this node (8503:22571), but reproducing
 * those pixel-for-pixel would fabricate real trademarks — this project has no
 * license to do so, so each is a neutral placeholder labelled with its name.
 */
const LABELS: Record<LogosName, string> = {
  "credit-card": "卡",
  mastercard: "Mastercard",
  jcb: "JCB",
  "line-pay": "LINE Pay",
  "google-pay": "Google Pay",
  "apple-pay": "Apple Pay",
  apple: "Apple",
  google: "G",
  facebook: "f",
  cht: "中華電信",
  "taiwan-mobile": "台灣大哥大",
  fet: "遠傳",
};

/** Figma: Logos (node 8503:22571) — payment/login brand marks, rendered here as text placeholder badges (see comment above). */
export function Logos({ name, className, ...rest }: LogosProps) {
  return (
    <span className={["tmads-logo-badge", className].filter(Boolean).join(" ")} {...rest}>
      {LABELS[name]}
    </span>
  );
}
