import type { HTMLAttributes } from "react";
import "./CardNotification.css";

export type CardNotificationProps = {
  infoMain?: string;
  infoContent?: string;
  time?: string;
  showBadge?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Cards / Notification (node 459:1657) — single component. */
export function CardNotification({
  infoMain = "阿里山林鐵因西南風帶來豪雨 仍有多處崩落土石待清理",
  infoContent = "受低壓帶影響，中央氣象署今上午 9 點 50 分對3 縣市發布陸上強風特報，請多留意。",
  time = "2025/12/23",
  showBadge = false,
  className,
  ...rest
}: CardNotificationProps) {
  return (
    <div className={["tmads-card-notification", className].filter(Boolean).join(" ")} {...rest}>
      {showBadge && <span className="tmads-card-notification__badge" aria-hidden="true" />}
      <div className="tmads-card-notification__content">
        <div className="tmads-card-notification__header">
          <p className="tmads-card-notification__main">{infoMain}</p>
          <span className="tmads-card-notification__time">{time}</span>
        </div>
        <p className="tmads-card-notification__body">{infoContent}</p>
      </div>
    </div>
  );
}
