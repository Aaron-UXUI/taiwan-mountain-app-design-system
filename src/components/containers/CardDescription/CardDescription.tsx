import type { HTMLAttributes } from "react";
import trailImagePlaceholder from "../../../assets/containers/trail-photo-placeholder.svg";
import "./CardDescription.css";

export type CardDescriptionProps = {
  title?: string;
  supportingText?: string;
  showTitle?: boolean;
  showImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Figma: Cards / Description (node 11441:11209) — single component.
 * The Figma node references a real trail photo fill via a temporary MCP
 * asset URL; that URL expires in 7 days, so `imageSrc` defaults to a local
 * placeholder illustration. Pass a real photo URL via `imageSrc` in production use.
 */
export function CardDescription({
  title = "森林浴步道",
  supportingText = "步道全長1,700 m，步道沿線林相為人工柳杉林與天然闊葉林，極適合林間漫步享受森林的氣息以及觀察自然生態，為本園區最長的步道，請斟酌體能。",
  showTitle = true,
  showImage = true,
  imageSrc,
  imageAlt = "",
  className,
  ...rest
}: CardDescriptionProps) {
  const resolvedImageSrc = imageSrc ?? trailImagePlaceholder;
  return (
    <div className={["tmads-card-description", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-card-description__text">
        {showTitle && <p className="tmads-card-description__title">{title}</p>}
        <p className="tmads-card-description__supporting">{supportingText}</p>
      </div>
      {showImage && (
        <div className="tmads-card-description__image-wrap">
          <img className="tmads-card-description__image" src={resolvedImageSrc} alt={imageAlt} />
        </div>
      )}
    </div>
  );
}
