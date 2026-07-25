import type { HTMLAttributes } from "react";
import "./Stepper.css";

/** Figma authors the zero state literally as `State=0`, so the value is kept as-is. */
export type StepperState = "0" | "Default" | "Error" | "Disabled";

export type StepperProps = {
  amount?: number;
  state?: StepperState;
  errorMessage?: string;
  onDecrement?: () => void;
  onIncrement?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onDecrement" | "onIncrement">;

/** Figma: Stepper (node 12190:23425) — State=0/Default/Error/Disabled. */
export function Stepper({
  amount = 0,
  state = "Default",
  errorMessage = "不可購買超過 10 份",
  onDecrement,
  onIncrement,
  className,
  ...rest
}: StepperProps) {
  const isDisabled = state === "Disabled";
  const isError = state === "Error";
  // `State=0` is the at-minimum state: the control is still interactive, but
  // there is nothing left to remove, so only decrement is greyed out.
  const isAtZero = state === "0";

  return (
    <div
      className={["tmads-stepper", className].filter(Boolean).join(" ")}
      data-state={state.toLowerCase()}
      {...rest}
    >
      <div className="tmads-stepper__control">
        <button
          type="button"
          className="tmads-stepper__button"
          disabled={isDisabled || isAtZero}
          aria-label="減少"
          onClick={onDecrement}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <span className="tmads-stepper__amount">{amount}</span>
        <button
          type="button"
          className="tmads-stepper__button"
          disabled={isDisabled}
          aria-label="增加"
          onClick={onIncrement}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path
              d="M12 6V18M6 12H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {isError && (
        <div className="tmads-stepper__error">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M8 1.5L14.5 13.5H1.5L8 1.5Z"
              stroke="var(--color-semantic-destruct-700)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M8 6.5V9.5M8 11.5H8.01"
              stroke="var(--color-semantic-destruct-700)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
