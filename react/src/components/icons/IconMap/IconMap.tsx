import type { SVGProps } from "react";

export type IconMapName = "tree" | "camera" | "walk" | "info";

export type IconMapProps = {
  name: IconMapName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const GLYPHS: Record<IconMapName, JSX.Element> = {
  tree: (
    <path
      d="M12 2L7 9H9.5L5.5 15H10V21H14V15H18.5L14.5 9H17L12 2Z"
      stroke="var(--color-gray-800)"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  camera: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2" stroke="var(--color-gray-800)" strokeWidth="1.4" fill="none" />
      <path d="M8.5 7L10 4.5H14L15.5 7" stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="13.5" r="3.5" stroke="var(--color-gray-800)" strokeWidth="1.4" fill="none" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4" r="1.8" fill="var(--color-gray-800)" />
      <path
        d="M13.5 7L10 8L8.5 13M13.5 7L16 9.5L18.5 8.5M13.5 7L11.5 12.5L14 14.5L14.5 20M11.5 12.5L7.5 15M14 14.5L18 17.5"
        stroke="var(--color-gray-800)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" stroke="var(--color-gray-800)" strokeWidth="1.4" fill="none" />
      <circle cx="12" cy="7.8" r="1.1" fill="var(--color-gray-800)" />
      <line x1="12" y1="11.3" x2="12" y2="17" stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
};

/** Figma: icon / 24px / Map (node 11129:12166) — tree, camera, walk, info. */
export function IconMap({ name, className, ...rest }: IconMapProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true" {...rest}>
      {GLYPHS[name]}
    </svg>
  );
}
