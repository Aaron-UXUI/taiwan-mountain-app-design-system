import type { HTMLAttributes } from "react";
import savedItemPlaceholder from "../../../assets/containers/saved-item-photo-placeholder.svg";
import "./CardSavedItems.css";

export type CardSavedItemsProps = {
  title?: string;
  liked?: string;
  photos?: string[];
} & HTMLAttributes<HTMLDivElement>;

/**
 * Figma: Cards / Saved Items (node 473:4929) — single component.
 * The Figma node references the same real photo fill for all four tiles via
 * a temporary MCP asset URL; that URL expires in 7 days, so `photos` defaults
 * to a local placeholder illustration repeated four times. Pass up to four
 * real photo URLs via `photos` in production use.
 */
export function CardSavedItems({
  title = "台灣北部",
  liked = "3 個收藏",
  photos,
  className,
  ...rest
}: CardSavedItemsProps) {
  const tiles = Array.from({ length: 4 }, (_, index) => photos?.[index] ?? savedItemPlaceholder);

  return (
    <div className={["tmads-card-saved-items", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-card-saved-items__grid">
        {tiles.map((src, index) => (
          <div className="tmads-card-saved-items__tile" key={index}>
            <img className="tmads-card-saved-items__image" src={src} alt="" />
          </div>
        ))}
      </div>
      <div className="tmads-card-saved-items__content">
        <p className="tmads-card-saved-items__title">{title}</p>
        <p className="tmads-card-saved-items__liked">{liked}</p>
      </div>
    </div>
  );
}
