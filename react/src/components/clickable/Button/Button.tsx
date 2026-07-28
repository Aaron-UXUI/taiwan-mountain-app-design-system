import type { ButtonHTMLAttributes } from "react";
import { SpinnerOnWhite } from "../../motion/SpinnerOnWhite";
import { SpinnerOnDark } from "../../motion/SpinnerOnDark";
import "./Button.css";

export type ButtonType = "Primary" | "Secondary" | "Tertiary";
export type ButtonSize = "Large" | "Small";
export type ButtonState = "Default" | "Disabled" | "Pressing" | "Loading";

/**
 * Only the combinations Figma actually authors. The props used to be freely
 * orthogonal, which let callers build the five styles the design does not
 * have; expressing the real matrix in the type means those stop compiling
 * rather than shipping as invented styles.
 */
export type ButtonVariant =
  | { size?: "Large"; type?: ButtonType; state?: ButtonState }
  | { size: "Small"; type?: "Primary" | "Secondary"; state?: Exclude<ButtonState, "Loading"> }
  | { size: "Small"; type: "Tertiary"; state?: "Default" };

export type ButtonProps = { label?: string } & ButtonVariant &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

/**
 * Figma: Buttons (node 425:5337) — Type × Size × State, 19 of the 24
 * combinations. Small has no Loading at any emphasis, and Tertiary/Small
 * exists only as Default. See `ButtonVariant`.
 */
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
