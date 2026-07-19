import type { SVGProps } from "react";

export type Icon24Name =
  | "map"
  | "map-filled"
  | "search"
  | "search-filled"
  | "notify"
  | "notify-filled"
  | "member"
  | "member-filled"
  | "heart"
  | "heart-filled"
  | "radio"
  | "radio-filled"
  | "gps"
  | "gps-filled"
  | "setting"
  | "more"
  | "filter"
  | "back"
  | "close"
  | "minus"
  | "plus"
  | "download";

export type Icon24Props = {
  name: Icon24Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const GLYPHS: Record<Icon24Name, JSX.Element> = {
  map: (
    <path
      d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z M9 4v14 M15 6v14"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "map-filled": (
    <path
      d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"
      fill="var(--color-gray-800)"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <line x1="14.8" y1="14.8" x2="20" y2="20" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "search-filled": (
    <>
      <circle cx="10" cy="10" r="6" fill="var(--color-gray-800)" />
      <line x1="14.8" y1="14.8" x2="20" y2="20" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  notify: (
    <path
      d="M12 3a5 5 0 0 0-5 5v3.4c0 1-.4 2-1.2 2.7L5 15h14l-.8-.9c-.8-.7-1.2-1.7-1.2-2.7V8a5 5 0 0 0-5-5Z M10 18a2 2 0 0 0 4 0"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "notify-filled": (
    <path
      d="M12 3a5 5 0 0 0-5 5v3.4c0 1-.4 2-1.2 2.7L5 15h14l-.8-.9c-.8-.7-1.2-1.7-1.2-2.7V8a5 5 0 0 0-5-5Z M10 18a2 2 0 0 0 4 0"
      fill="var(--color-gray-800)"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  member: (
    <>
      <circle cx="12" cy="8" r="3.5" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <path
        d="M5 20c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5"
        stroke="var(--color-gray-800)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  "member-filled": (
    <>
      <circle cx="12" cy="8" r="3.5" fill="var(--color-gray-800)" />
      <path d="M5 20c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5" fill="var(--color-gray-800)" />
    </>
  ),
  heart: (
    <path
      d="M12 20.2C12 20.2 3.5 15.3 3.5 9.3C3.5 6.5 5.7 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.3 4.3 20.5 6.5 20.5 9.3C20.5 15.3 12 20.2 12 20.2Z"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "heart-filled": (
    <path
      d="M12 20.2C12 20.2 3.5 15.3 3.5 9.3C3.5 6.5 5.7 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.3 4.3 20.5 6.5 20.5 9.3C20.5 15.3 12 20.2 12 20.2Z"
      fill="var(--color-gray-800)"
    />
  ),
  radio: <circle cx="12" cy="12" r="8" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />,
  "radio-filled": (
    <>
      <circle cx="12" cy="12" r="8" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" fill="var(--color-gray-800)" />
    </>
  ),
  gps: (
    <>
      <circle cx="12" cy="12" r="7" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" fill="var(--color-gray-800)" />
      <line x1="12" y1="1.5" x2="12" y2="4" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="22.5" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="12" x2="4" y2="12" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="12" x2="22.5" y2="12" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "gps-filled": (
    <>
      <circle cx="12" cy="12" r="7" fill="var(--color-gray-800)" />
      <circle cx="12" cy="12" r="2.2" fill="var(--color-gray-white)" />
    </>
  ),
  setting: (
    <path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      stroke="var(--color-gray-800)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.6" fill="var(--color-gray-800)" />
      <circle cx="12" cy="12" r="1.6" fill="var(--color-gray-800)" />
      <circle cx="18" cy="12" r="1.6" fill="var(--color-gray-800)" />
    </>
  ),
  filter: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="17" x2="15" y2="17" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  back: (
    <path
      d="M15 4L7 12L15 20"
      stroke="var(--color-gray-800)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  close: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  minus: <line x1="5" y1="12" x2="19" y2="12" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />,
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  download: (
    <>
      <path
        d="M12 4V15M12 15L7.5 10.5M12 15L16.5 10.5"
        stroke="var(--color-gray-800)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M5 19H19" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

/** Figma: icon / 24px (node 486:5205) — 21+ glyphs, off/filled pairs for map/search/notify/member/heart/radio/gps. */
export function Icon24({ name, className, ...rest }: Icon24Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {GLYPHS[name]}
    </svg>
  );
}
