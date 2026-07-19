import "./Banner.css";

export type BannerType = "Default";

export type BannerProps = {
  type?: BannerType;
  label?: string;
  className?: string;
};

/** Figma: Banner (node 15301:14557) — Type=Default. */
export function Banner({ label = "無法連上網路，離線使用中", className }: BannerProps) {
  return (
    <div className={["tmads-banner", className].filter(Boolean).join(" ")}>
      <p className="tmads-banner__label">{label}</p>
    </div>
  );
}
