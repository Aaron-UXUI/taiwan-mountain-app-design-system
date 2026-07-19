import "./PaymentInfo.css";

export type PaymentInfoState = "Selected" | "Unselected";

export type PaymentInfoProps = {
  state?: PaymentInfoState;
  title?: string;
  ticketLines?: string[];
  total?: string;
  className?: string;
};

/** Figma: Payment Info (node 12561:16649) — State=Selected/Unselected. */
export function PaymentInfo({
  state = "Selected",
  title = "內洞國家森林遊樂區",
  ticketLines = ["全票 x 2", "半票 x 1", "烏來臺車來回搭乘券 x 3"],
  total = "425",
  className,
}: PaymentInfoProps) {
  const isSelected = state === "Selected";

  return (
    <div
      className={[
        "tmads-payment-info",
        isSelected ? "tmads-payment-info--selected" : "tmads-payment-info--unselected",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isSelected && (
        <div className="tmads-payment-info__ticket">
          <p className="tmads-payment-info__title">{title}</p>
          <div className="tmads-payment-info__lines">
            {ticketLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      )}
      <div className="tmads-payment-info__price">
        <span className="tmads-payment-info__currency">NT$</span>
        <span className="tmads-payment-info__amount">{total}</span>
      </div>
    </div>
  );
}
