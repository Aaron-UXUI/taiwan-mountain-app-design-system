import type { SVGProps } from "react";

export type IconWeatherName = "cloud-sun" | "sunny" | "rain" | "lightning-rain" | "windy" | "typhoon" | "cloud-snow";

export type IconWeatherProps = {
  name: IconWeatherName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height">;

const CLOUD_PATH =
  "M6.5 18a3.5 3.5 0 0 1-.7-6.93A5 5 0 0 1 15.6 9.6 4 4 0 0 1 17.5 18h-11Z";

const Cloud = () => (
  <path d={CLOUD_PATH} stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
);

const GLYPHS: Record<IconWeatherName, JSX.Element> = {
  "cloud-sun": (
    <>
      <circle cx="16" cy="6.5" r="2.8" fill="var(--color-accent-yellow-100)" stroke="var(--color-accent-yellow-700)" strokeWidth="1" />
      <Cloud />
    </>
  ),
  sunny: (
    <>
      <circle cx="12" cy="12" r="4.5" fill="var(--color-accent-yellow-100)" stroke="var(--color-accent-yellow-700)" strokeWidth="1.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="3.5"
          x2="12"
          y2="5.5"
          stroke="var(--color-accent-yellow-700)"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </>
  ),
  rain: (
    <>
      <Cloud />
      <line x1="8" y1="19" x2="7" y2="22" stroke="var(--color-semantic-info-600)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="19" x2="11" y2="22" stroke="var(--color-semantic-info-600)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="19" x2="15" y2="22" stroke="var(--color-semantic-info-600)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  "lightning-rain": (
    <>
      <Cloud />
      <path
        d="M12.5 18.5L10 22.5H12.5L11 25.5"
        stroke="var(--color-accent-yellow-700)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(0 -4)"
      />
      <line x1="7" y1="19" x2="6.3" y2="21.5" stroke="var(--color-semantic-info-600)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="17" y1="19" x2="16.3" y2="21.5" stroke="var(--color-semantic-info-600)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  windy: (
    <>
      <path d="M3 9h11a2.5 2.5 0 1 0-2.4-3.2" stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M3 14h14a2.5 2.5 0 1 1-2.4 3.2" stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <line x1="3" y1="19" x2="12" y2="19" stroke="var(--color-gray-800)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  typhoon: (
    <path
      d="M12 4a8 8 0 1 1-7.5 10.6 M12 8a4 4 0 1 1-3.6 5.7 M12 12a1.6 1.6 0 1 1-1.4 2.2"
      stroke="var(--color-gray-800)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
  ),
  "cloud-snow": (
    <>
      <Cloud />
      <circle cx="8" cy="20" r="1.1" fill="var(--color-semantic-info-600)" />
      <circle cx="12" cy="21.5" r="1.1" fill="var(--color-semantic-info-600)" />
      <circle cx="16" cy="20" r="1.1" fill="var(--color-semantic-info-600)" />
    </>
  ),
};

/** Figma: icon / 24px / weather (node 1743:13737) — cloud-sun, sunny, rain, lightning-rain, windy, typhoon, cloud-snow. */
export function IconWeather({ name, className, ...rest }: IconWeatherProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true" {...rest}>
      {GLYPHS[name]}
    </svg>
  );
}
