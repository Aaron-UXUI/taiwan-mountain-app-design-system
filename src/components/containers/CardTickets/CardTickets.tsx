import type { HTMLAttributes } from "react";
import "./CardTickets.css";

export type CardTicketsState = "Default" | "Disabled";

export type CardTicketsProps = {
  scene?: string;
  ticketType?: string;
  additionalItem?: string;
  due?: string;
  price?: string;
  state?: CardTicketsState;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Cards / Tickets (node 1373:16817) — state=default/disable. */
export function CardTickets({
  scene = "阿里山國家森林遊樂區",
  ticketType = "全票 x 1",
  additionalItem = "烏來臺車來回搭乘券 x 1",
  due = "使用期限 2026/09/10",
  price = "NT$ 425",
  state = "Default",
  className,
  ...rest
}: CardTicketsProps) {
  const isDisabled = state === "Disabled";

  return (
    <div
      className={["tmads-card-tickets", className].filter(Boolean).join(" ")}
      data-state={state.toLowerCase()}
      {...rest}
    >
      <div className="tmads-card-tickets__header">
        <span className="tmads-card-tickets__due">{due}</span>
        {isDisabled && <span className="tmads-card-tickets__used">已使用</span>}
      </div>
      <div className="tmads-card-tickets__divider" aria-hidden="true" />
      <div className="tmads-card-tickets__body">
        <div className="tmads-card-tickets__info">
          <p className="tmads-card-tickets__scene">{scene}</p>
          <p className="tmads-card-tickets__ticket-type">{ticketType}</p>
          {!isDisabled && additionalItem && (
            <p className="tmads-card-tickets__additional">{additionalItem}</p>
          )}
        </div>
        <span className="tmads-card-tickets__price">{price}</span>
      </div>
    </div>
  );
}
