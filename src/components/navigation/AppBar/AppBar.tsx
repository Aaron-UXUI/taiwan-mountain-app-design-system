import type { HTMLAttributes } from "react";
import "./AppBar.css";

export type AppBarType = "nav" | "ProfileInfo";

export type AppBarProps = {
  type?: AppBarType;
  title?: string;
  showBack?: boolean;
  showButtonSetting?: boolean;
  showTitle?: boolean;
  name?: string;
  avatarSrc?: string;
  onBackClick?: () => void;
  onSettingClick?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const ChevronLeftGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M15 5L8 12L15 19" stroke="var(--color-gray-black)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GearGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="var(--color-gray-black)" strokeWidth="1.6" />
    <path
      d="M12 3V5M12 19V21M21 12H19M5 12H3M18.4 5.6L17 7M7 17L5.6 18.4M18.4 18.4L17 17M7 7L5.6 5.6"
      stroke="var(--color-gray-black)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const AvatarGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="3.5" fill="var(--color-gray-400)" />
    <path d="M5 19C6 15.7 8.7 13.5 12 13.5C15.3 13.5 18 15.7 19 19" fill="var(--color-gray-400)" />
  </svg>
);

/**
 * Figma: App Bar (node 495:426) — Type=nav/ProfileInfo.
 * The Figma ProfileInfo variant references a real photo fill via a temporary MCP asset URL;
 * when `avatarSrc` isn't supplied a hand-coded placeholder glyph is shown instead.
 */
export function AppBar({
  type = "nav",
  title = "標題",
  showBack = true,
  showButtonSetting = false,
  showTitle = true,
  name = "Elaine Lin",
  avatarSrc,
  onBackClick,
  onSettingClick,
  className,
  ...rest
}: AppBarProps) {
  const isProfile = type === "ProfileInfo";

  return (
    <div
      className={["tmads-app-bar", isProfile ? "tmads-app-bar--profile" : "tmads-app-bar--nav", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {!isProfile && (
        <>
          {showBack && (
            <button type="button" className="tmads-app-bar__back" aria-label="返回" onClick={onBackClick}>
              <ChevronLeftGlyph />
            </button>
          )}
          {showTitle && <p className="tmads-app-bar__title">{title}</p>}
          {showButtonSetting && (
            <button type="button" className="tmads-app-bar__setting" aria-label="設定" onClick={onSettingClick}>
              <GearGlyph />
            </button>
          )}
        </>
      )}
      {isProfile && (
        <>
          <span className="tmads-app-bar__avatar">
            {avatarSrc ? <img src={avatarSrc} alt="" /> : <AvatarGlyph />}
          </span>
          <p className="tmads-app-bar__name">{name}</p>
          <button type="button" className="tmads-app-bar__setting" aria-label="設定" onClick={onSettingClick}>
            <GearGlyph />
          </button>
        </>
      )}
    </div>
  );
}
