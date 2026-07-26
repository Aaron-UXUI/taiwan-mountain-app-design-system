import type { HTMLAttributes, ReactNode } from "react";
import "./ListWeather.css";

function CloudSunIcon() {
  return (
    <svg className="tmads-list-weather__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="16.5" cy="8.5" r="4" fill="var(--color-accent-yellow-100)" stroke="var(--color-accent-yellow-700)" strokeWidth="1.2" />
      <path
        d="M4 16.5a3.5 3.5 0 0 1 3.2-3.49 4.5 4.5 0 0 1 8.6-1.4A3.75 3.75 0 0 1 15.25 19H7a3 3 0 0 1-3-2.5Z"
        fill="var(--color-gray-white)"
        stroke="var(--color-gray-800)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ListWeatherProps = {
  icon?: ReactNode;
  date?: string;
  week?: string;
  temperature?: string;
  apparentTemperature?: string;
  precipitationRate?: string;
  uv?: string;
  degreeOfUv?: string;
  sunrise?: string;
  sunset?: string;
  humidity?: string;
  windSpeed?: string;
  windDirection?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Figma: List / weather (node 778:9646) — single component.
 * Represents one day/column of a multi-day weather forecast table; the row
 * labels ("溫度", "體感", "降雨機率" ...) live outside this component as a
 * separate label column in the Figma layout.
 */
export function ListWeather({
  icon,
  date = "08/11",
  week = "星期日",
  temperature = "29 / 33℃",
  apparentTemperature = "29 / 33℃",
  precipitationRate = "90%",
  uv = "5",
  degreeOfUv = "中量級",
  sunrise = "05:48",
  sunset = "17:37",
  humidity = "84%",
  windSpeed = "4",
  windDirection = "東南",
  className,
  ...rest
}: ListWeatherProps) {
  return (
    <div className={["tmads-list-weather", className].filter(Boolean).join(" ")} {...rest}>
      <div className="tmads-list-weather__icon">{icon ?? <CloudSunIcon />}</div>
      <div className="tmads-list-weather__body">
        <div className="tmads-list-weather__date">
          <p className="tmads-list-weather__date-day">{date}</p>
          <p className="tmads-list-weather__date-week">{week}</p>
        </div>
        <p className="tmads-list-weather__value">{temperature}</p>
        <p className="tmads-list-weather__value">{apparentTemperature}</p>
        <p className="tmads-list-weather__value">{precipitationRate}</p>
        <div className="tmads-list-weather__uv">
          <p className="tmads-list-weather__value">{uv}</p>
          <p className="tmads-list-weather__uv-label">{degreeOfUv}</p>
        </div>
        <p className="tmads-list-weather__value">{sunrise}</p>
        <p className="tmads-list-weather__value">{sunset}</p>
        <p className="tmads-list-weather__value">{humidity}</p>
        <p className="tmads-list-weather__value">{windSpeed}</p>
        <p className="tmads-list-weather__value tmads-list-weather__value--small">{windDirection}</p>
      </div>
    </div>
  );
}
