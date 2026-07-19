import type { HTMLAttributes } from "react";
import sceneImagePlaceholder from "../../../assets/containers/scene-photo-placeholder.svg";
import "./CardScene.css";

export type CardSceneProps = {
  siteName?: string;
  location?: string;
  distance?: string;
  showDistance?: boolean;
  showFamilyFriendlyLabel?: boolean;
  statusLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  saved?: boolean;
  onToggleSave?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

/**
 * Figma: Cards / Scene (node 374:3819) — single component.
 * The Figma node references a real photo fill via a temporary MCP asset URL;
 * that URL expires in 7 days, so `imageSrc` defaults to a local placeholder
 * illustration. Pass a real photo URL via `imageSrc` in production use.
 */
export function CardScene({
  siteName = "景點名稱",
  location = "台北市內湖區",
  distance = "1.2km",
  showDistance = false,
  showFamilyFriendlyLabel = false,
  statusLabel = "今日開放",
  imageSrc,
  imageAlt = "",
  saved = false,
  onToggleSave,
  className,
  ...rest
}: CardSceneProps) {
  const resolvedImageSrc = imageSrc ?? sceneImagePlaceholder;
  return (
    <div className={["tmads-card-scene", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-card-scene__picture">
        <img className="tmads-card-scene__image" src={resolvedImageSrc} alt={imageAlt} />
        <div className="tmads-card-scene__status">{statusLabel}</div>
        {showFamilyFriendlyLabel && (
          <div className="tmads-card-scene__family-label">親子友善</div>
        )}
        <div className="tmads-card-scene__content">
          <div className="tmads-card-scene__text">
            <p className="tmads-card-scene__title">{siteName}</p>
            <div className="tmads-card-scene__meta">
              <span className="tmads-card-scene__location">{location}</span>
              {showDistance && (
                <span className="tmads-card-scene__distance">
                  <span className="tmads-card-scene__divider" aria-hidden="true" />
                  {distance}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="tmads-card-scene__save"
            aria-label={saved ? "取消收藏" : "加入收藏"}
            aria-pressed={saved}
            onClick={onToggleSave}
          >
            <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path
                d="M12 21s-7.5-4.6-10-9.3C.4 8.7 2 5 5.6 4.2 8 3.7 10.3 5 12 7.3 13.7 5 16 3.7 18.4 4.2 22 5 23.6 8.7 22 11.7 19.5 16.4 12 21 12 21z"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
