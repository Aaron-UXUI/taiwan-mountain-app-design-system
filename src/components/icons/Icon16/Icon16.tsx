import type { SVGProps } from "react";

export type Icon16Name = "exclamation" | "arrow-up-right" | "notified" | "non-notified" | "heart" | "heart-filled";

export type Icon16Props = {
  name: Icon16Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const HEART_PATH = "M8 13.6C8 13.6 2.3 10.3 2.3 6.3C2.3 4.4 3.8 2.9 5.6 2.9C6.7 2.9 7.6 3.4 8 4.1C8.4 3.4 9.3 2.9 10.4 2.9C12.2 2.9 13.7 4.4 13.7 6.3C13.7 10.3 8 13.6 8 13.6Z";

const GLYPHS: Record<Icon16Name, JSX.Element> = {
  exclamation: (
    <>
      <circle cx="8" cy="8" r="7" fill="var(--color-semantic-destruct-600)" />
      <line x1="8" y1="4.5" x2="8" y2="9" stroke="var(--color-gray-white)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.9" fill="var(--color-gray-white)" />
    </>
  ),
  "arrow-up-right": (
    <path
      d="M4 12L12 4M12 4H6.5M12 4V9.5"
      stroke="var(--color-gray-800)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  notified: (
    <path
      d="M8 2a3.3 3.3 0 0 0-3.3 3.3v2.3c0 .7-.3 1.3-.8 1.8L3.3 10h9.4l-.6-.6c-.5-.5-.8-1.1-.8-1.8V5.3A3.3 3.3 0 0 0 8 2Z M6.7 12a1.3 1.3 0 0 0 2.6 0"
      stroke="var(--color-gray-800)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "non-notified": (
    <>
      <path
        d="M8 2a3.3 3.3 0 0 0-3.3 3.3v2.3c0 .7-.3 1.3-.8 1.8L3.3 10h9.4l-.6-.6c-.5-.5-.8-1.1-.8-1.8V5.3A3.3 3.3 0 0 0 8 2Z M6.7 12a1.3 1.3 0 0 0 2.6 0"
        stroke="var(--color-gray-800)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="2.5" y1="13" x2="13" y2="2.5" stroke="var(--color-gray-800)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  heart: <path d={HEART_PATH} stroke="var(--color-gray-800)" strokeWidth="1.3" strokeLinejoin="round" fill="none" />,
  "heart-filled": <path d={HEART_PATH} fill="var(--color-gray-800)" />,
};

/** Figma: icon / 16px (node 10787:61593) — exclamation, arrow-up-right, notified/non-notified, heart no/yes. */
export function Icon16({ name, className, ...rest }: Icon16Props) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" className={className} aria-hidden="true" {...rest}>
      {GLYPHS[name]}
    </svg>
  );
}
