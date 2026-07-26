import type { HTMLAttributes } from "react";
import { Button } from "../../clickable/Button";
import { CheckBoxNavigation } from "../CheckBoxNavigation";
import { NavigationBar, type NavigationBarState } from "../NavigationBar";
import { HomeIndicator } from "../../ios-system/HomeIndicator";
import "./BottomBar.css";

export type BottomBarType = "Button" | "2 Buttons" | "Navigation" | "Place Order";

const MapGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M9 4L4 6V20L9 18L15 20L20 18V4L15 6L9 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 4V18M15 6V20" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export type BottomBarProps = {
  type?: BottomBarType;
  buttonLabel?: string;
  onButtonClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  navigationState?: NavigationBarState;
  onNavigationTabClick?: (tab: NavigationBarState) => void;
  ticketTitle?: string;
  ticketLines?: string[];
  priceCurrency?: string;
  price?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

/**
 * Figma: Bottom Bar (node 1480:37613) — Type=Button/2 Buttons/Navigation/Place Order.
 * Reuses Button, CheckBoxNavigation, NavigationBar and HomeIndicator rather than
 * re-implementing their markup/styles.
 */
export function BottomBar({
  type = "Button",
  buttonLabel = "按鈕",
  onButtonClick,
  secondaryLabel = "地圖",
  onSecondaryClick,
  navigationState = "activity",
  onNavigationTabClick,
  ticketTitle = "內洞國家森林遊樂區電子票券",
  ticketLines = ["全票 x 2", "半票 x 1", "烏來臺車來回搭乘券 x 3"],
  priceCurrency = "NT$",
  price = "425",
  className,
  ...rest
}: BottomBarProps) {
  return (
    <div
      className={["tmads-bottom-bar", `tmads-bottom-bar--${type.toLowerCase().replace(/\s+/g, "-")}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {type === "Button" && (
        <div className="tmads-bottom-bar__content">
          <Button label={buttonLabel} onClick={onButtonClick} className="tmads-bottom-bar__button" />
        </div>
      )}

      {type === "2 Buttons" && (
        <div className="tmads-bottom-bar__content tmads-bottom-bar__content--row">
          <Button label={buttonLabel} onClick={onButtonClick} className="tmads-bottom-bar__button" />
          <CheckBoxNavigation
            label={secondaryLabel}
            icon={<MapGlyph />}
            onClick={onSecondaryClick}
            className="tmads-bottom-bar__secondary"
          />
        </div>
      )}

      {type === "Navigation" && (
        <div className="tmads-bottom-bar__content">
          <NavigationBar state={navigationState} onTabClick={onNavigationTabClick} />
        </div>
      )}

      {type === "Place Order" && (
        <div className="tmads-bottom-bar__content">
          <div className="tmads-bottom-bar__order">
            <div className="tmads-bottom-bar__ticket-info">
              <p className="tmads-bottom-bar__ticket-title">{ticketTitle}</p>
              <div className="tmads-bottom-bar__ticket-lines">
                {ticketLines.map((line) => (
                  <p key={line} className="tmads-bottom-bar__ticket-line">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="tmads-bottom-bar__price">
              <span className="tmads-bottom-bar__price-currency">{priceCurrency}</span>
              <span className="tmads-bottom-bar__price-amount">{price}</span>
            </div>
          </div>
          <Button label={buttonLabel} onClick={onButtonClick} className="tmads-bottom-bar__button" />
        </div>
      )}

      <HomeIndicator />
    </div>
  );
}
