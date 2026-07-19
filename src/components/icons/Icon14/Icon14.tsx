import type { SVGProps } from "react";

export type Icon14Name = "chevron" | "secured";

export type Icon14Props = {
  name: Icon14Name;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const GLYPHS: Record<Icon14Name, JSX.Element> = {
  chevron: (
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="var(--color-gray-800)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  secured: (
    <>
      <path
        d="M7 1L12 3V7C12 10 9.5 12 7 13C4.5 12 2 10 2 7V3L7 1Z"
        stroke="var(--color-gray-800)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M4.7 7L6.2 8.5L9.3 5.2" stroke="var(--color-gray-800)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
};

/** Figma: icon / 14px (node 507:4429) — chevron, secured. */
export function Icon14({ name, className, ...rest }: Icon14Props) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" className={className} aria-hidden="true" {...rest}>
      {GLYPHS[name]}
    </svg>
  );
}
