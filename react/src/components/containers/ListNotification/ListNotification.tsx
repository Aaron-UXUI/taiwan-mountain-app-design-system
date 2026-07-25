import type { InputHTMLAttributes } from "react";
import "./ListNotification.css";

export type ListNotificationProps = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

/**
 * Figma: List / Notification (node 13452:15906) — single component.
 * The toggle switch is presentational here; the reusable `Toggles` component
 * itself belongs to the Clickable / 互動元件 category (node 10291:14552).
 */
export function ListNotification({ label = "滿月圓國家森林遊樂區", className, id, ...rest }: ListNotificationProps) {
  return (
    <label className={["tmads-list-notification", className].filter(Boolean).join(" ")} htmlFor={id}>
      <span className="tmads-list-notification__label">{label}</span>
      <input id={id} type="checkbox" className="tmads-list-notification__input" {...rest} />
      <span className="tmads-list-notification__switch" aria-hidden="true">
        <span className="tmads-list-notification__handle" />
      </span>
    </label>
  );
}
