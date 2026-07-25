import type { ButtonHTMLAttributes } from "react";
import { SpinnerOnWhite } from "../../motion/SpinnerOnWhite";
import { SpinnerOnDark } from "../../motion/SpinnerOnDark";
import "./Button.css";

export type ButtonType = "Primary" | "Secondary" | "Tertiary";
export type ButtonSize = "Large" | "Small";
export type ButtonState = "Default" | "Disabled" | "Pressing" | "Loading";

export type ButtonProps = {
  label?: string;
  type?: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/** Figma: Buttons (node 425:5337) — Type × Size × State variants. */
export function Button({
  label = "按鈕",
  type = "Primary",
  size = "Large",
  state = "Default",
  className,
  ...rest
}: ButtonProps) {
  const stateKey = state.toLowerCase();
  const isLoading = state === "Loading";
  const Spinner = type === "Primary" ? SpinnerOnDark : SpinnerOnWhite;

  return (
    <button
      className={[
        "tmads-button",
        `tmads-button--${type.toLowerCase()}`,
        `tmads-button--${size.toLowerCase()}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={stateKey}
      disabled={state === "Disabled" || isLoading}
      {...rest}
    >
      {isLoading ? <Spinner /> : label}
    </button>
  );
}
