import type { HTMLAttributes } from "react";
import { Button } from "../../clickable/Button";
import "./BottomSheet.css";

export type BottomSheetStyle = "Filter_Discover" | "Map_Info" | "Filter_MapSearch";

export type BottomSheetProps = {
  style?: BottomSheetStyle;
} & HTMLAttributes<HTMLDivElement>;

const FILTER_SECTIONS = ["景點類型", "活動", "地區", "開放情況", "交通方式", "難度"];

function FilterDiscoverContent() {
  return (
    <div className="tmads-bottom-sheet__content">
      <div className="tmads-bottom-sheet__section">
        <p className="tmads-bottom-sheet__section-title">排序依據</p>
        <div className="tmads-bottom-sheet__segmented">
          <span className="tmads-bottom-sheet__segmented-option tmads-bottom-sheet__segmented-option--active">瀏覽數</span>
          <span className="tmads-bottom-sheet__segmented-option">距離</span>
        </div>
      </div>
      <div className="tmads-bottom-sheet__section">
        <p className="tmads-bottom-sheet__section-title">篩選</p>
        {FILTER_SECTIONS.map((label) => (
          <div key={label} className="tmads-bottom-sheet__filter-row">
            <span>{label}</span>
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="tmads-bottom-sheet__chevron">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
      <Button label="套用" size="Large" className="tmads-bottom-sheet__apply" />
    </div>
  );
}

function MapInfoContent() {
  return (
    <div className="tmads-bottom-sheet__content tmads-bottom-sheet__content--map-info">
      <p className="tmads-bottom-sheet__title">內洞國家森林遊樂區</p>
      <div className="tmads-bottom-sheet__tags">
        <span className="tmads-bottom-sheet__tag tmads-bottom-sheet__tag--salient">今日開放</span>
        <span className="tmads-bottom-sheet__tag tmads-bottom-sheet__tag--special">親子友善</span>
      </div>
      <div className="tmads-bottom-sheet__tags">
        {["國家森林遊樂區", "溪流", "賞蛙", "蕨類", "瀑布"].map((tag) => (
          <span key={tag} className="tmads-bottom-sheet__tag tmads-bottom-sheet__tag--outline">{tag}</span>
        ))}
      </div>
      <div className="tmads-bottom-sheet__crowdedness">
        <span>即時人潮狀況</span>
        <span className="tmads-bottom-sheet__crowdedness-label">舒適</span>
      </div>
      <div className="tmads-bottom-sheet__image" aria-hidden="true" />
      <Button label="購買票券" size="Large" className="tmads-bottom-sheet__apply" />
    </div>
  );
}

function FilterMapSearchContent() {
  const cards = [
    { title: "烏來溫泉", meta: "新北市烏來區 · 1.1km" },
    { title: "烏來台車", meta: "新北市烏來區 · 1.2km" },
    { title: "烏紗溪瀑布", meta: "新北市烏來區 · 2.2km" },
  ];
  return (
    <div className="tmads-bottom-sheet__content tmads-bottom-sheet__content--map-search">
      {cards.map((card) => (
        <div key={card.title} className="tmads-bottom-sheet__card">
          <div className="tmads-bottom-sheet__card-image" aria-hidden="true" />
          <p className="tmads-bottom-sheet__card-title">{card.title}</p>
          <p className="tmads-bottom-sheet__card-meta">{card.meta}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Figma: Bottom Sheets (node 495:540) — Style=Filter_Discover/Map_Info/Filter_MapSearch.
 * This is a compound layout component; the sheet chrome (drag handle, container,
 * home indicator) reproduces the Figma structure exactly, while the content of
 * each style slot is simplified placeholder markup rather than a full rebuild
 * of every nested child component (filter chips, segmented controls, cards).
 */
export function BottomSheet({ style = "Filter_Discover", className, children, ...rest }: BottomSheetProps) {
  return (
    <div
      className={["tmads-bottom-sheet", `tmads-bottom-sheet--${style.toLowerCase().replace(/_/g, "-")}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div className="tmads-bottom-sheet__top-bar">
        <span className="tmads-bottom-sheet__handle" aria-hidden="true" />
      </div>
      {children ?? (
        <>
          {style === "Filter_Discover" && <FilterDiscoverContent />}
          {style === "Map_Info" && <MapInfoContent />}
          {style === "Filter_MapSearch" && <FilterMapSearchContent />}
        </>
      )}
      <div className="tmads-bottom-sheet__home-indicator" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
