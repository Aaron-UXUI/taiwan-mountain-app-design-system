import type { SVGProps } from "react";

export type Icon20Name = "search" | "microphone" | "check" | "info" | "credit-card" | "open-eye" | "close-eye";

export type Icon20Props = {
  name: Icon20Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const GLYPHS: Record<Icon20Name, JSX.Element> = {
  search: (
    <>
      <circle cx="8" cy="8" r="5" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <line x1="11.8" y1="11.8" x2="17" y2="17" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  microphone: (
    <>
      <rect x="7" y="2" width="6" height="10" rx="3" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <path d="M4 9.5a6 6 0 0 0 12 0" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="10" y1="15.5" x2="10" y2="18" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.5" y1="18" x2="13.5" y2="18" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  check: (
    <path
      d="M4 10.5L8 14.5L16 5.5"
      stroke="var(--color-semantic-success-600)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  info: (
    <>
      <circle cx="10" cy="10" r="8" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="6.5" r="1" fill="var(--color-gray-800)" />
      <line x1="10" y1="9.5" x2="10" y2="14.5" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "credit-card": (
    <>
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="var(--color-gray-800)" strokeWidth="1.5" />
    </>
  ),
  "open-eye": (
    <>
      <path
        d="M2 10S5 5 10 5s8 5 8 5-3 5-8 5-8-5-8-5Z"
        stroke="var(--color-gray-800)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="10" cy="10" r="2.5" stroke="var(--color-gray-800)" strokeWidth="1.5" fill="none" />
    </>
  ),
  "close-eye": (
    <>
      <path
        d="M2 10S5 5.5 10 5.5s8 4.5 8 4.5-3 4.5-8 4.5-8-4.5-8-4.5Z"
        stroke="var(--color-gray-800)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="3.5" y1="15" x2="16.5" y2="5" stroke="var(--color-gray-800)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

/** Figma: icon / 20px (node 490:21891) — search, microphone, check, info, credit-card, close-eye, open-eye. */
export function Icon20({ name, className, ...rest }: Icon20Props) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" className={className} aria-hidden="true" {...rest}>
      {GLYPHS[name]}
    </svg>
  );
}
