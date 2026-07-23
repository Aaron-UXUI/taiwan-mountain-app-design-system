import { useState, type HTMLAttributes } from "react";
import { Button } from "../../clickable/Button";
import { ChipsSalient } from "../../clickable/ChipsSalient";
import { ChipsSmall } from "../../clickable/ChipsSmall";
import { SegmentedControls } from "../../clickable/SegmentedControls";
import { LinkFurtherInfo } from "../../clickable/LinkFurtherInfo";
import { CardScene } from "../../containers/CardScene";
import { Crowdedness } from "../../indicators/Crowdedness";
import { CarouselIndicators } from "../../indicators/CarouselIndicators";
import { HomeIndicator } from "../../ios-system/HomeIndicator";
import { AccordionCheckBox } from "../AccordionCheckBox";
import { AccordionChips } from "../AccordionChips";
import heroPlaceholder from "../../../assets/containers/scene-photo-placeholder.svg";
import "./BottomSheet.css";

export type BottomSheetStyle = "Filter_Discover" | "Map_Info" | "Filter_MapSearch";

export type BottomSheetProps = {
  style?: BottomSheetStyle;
} & HTMLAttributes<HTMLDivElement>;

const CHIP_ACCORDION_TITLES = ["活動", "地區", "開放情況", "交通方式", "難度", "無障礙友善", "步道長度", "海拔高度"];

const TAG_LABELS = ["國家森林遊樂區", "溪流", "賞蛙", "蕨類", "瀑布", "陰離子", "杜鵑", "螢火蟲", "野薑花", "山櫻"];

const SCENE_CARDS = [
  { siteName: "烏來溫泉", distance: "1.1km" },
  { siteName: "烏來台車", distance: "1.2km" },
  { siteName: "烏紗溪瀑布", distance: "2.2km" },
  { siteName: "森林浴步道", distance: "3.2km" },
  { siteName: "觀瀑步道", distance: "3.5km" },
  { siteName: "內洞溪瀑布", distance: "3.5km" },
];

const HeartGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M8 13.5S2 10 2 6.2C2 4.2 3.6 2.7 5.5 2.7C6.7 2.7 7.5 3.3 8 4C8.5 3.3 9.3 2.7 10.5 2.7C12.4 2.7 14 4.2 14 6.2C14 10 8 13.5 8 13.5Z"
      stroke="var(--color-primary-green-800)"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const BellGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M4 6.5C4 4 5.8 2.5 8 2.5C10.2 2.5 12 4 12 6.5C12 9.5 13 10.5 13 10.5H3S4 9.5 4 6.5Z"
      stroke="var(--color-primary-green-800)"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="var(--color-primary-green-800)" strokeWidth="1.4" />
  </svg>
);

const DownloadGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M8 2.5V10M8 10L5 7M8 10L11 7" stroke="var(--color-primary-green-800)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12.5H13" stroke="var(--color-primary-green-800)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

function FilterDiscoverContent() {
  const [sort, setSort] = useState<"Left" | "Right">("Left");
  return (
    <>
      <div className="tmads-bottom-sheet__content tmads-bottom-sheet__content--filter-discover">
        <div className="tmads-bottom-sheet__section">
          <p className="tmads-bottom-sheet__section-title">排序依據</p>
          <SegmentedControls selected={sort} onSelectedChange={setSort} />
        </div>
        <div className="tmads-bottom-sheet__section">
          <p className="tmads-bottom-sheet__section-title">篩選</p>
          <div className="tmads-bottom-sheet__accordions">
            <AccordionCheckBox />
            <AccordionChips />
            {CHIP_ACCORDION_TITLES.map((title) => (
              <AccordionChips key={title} title={title} />
            ))}
          </div>
        </div>
      </div>
      <div className="tmads-bottom-sheet__footer">
        <Button label="套用" type="Secondary" size="Large" className="tmads-bottom-sheet__apply" />
      </div>
    </>
  );
}

function MapInfoContent() {
  return (
    <div className="tmads-bottom-sheet__content tmads-bottom-sheet__content--map-info">
      <p className="tmads-bottom-sheet__title">內洞國家森林遊樂區</p>
      <div className="tmads-bottom-sheet__tags">
        <ChipsSalient label="今日開放" />
        <ChipsSalient label="親子友善" type="Special" />
      </div>
      <div className="tmads-bottom-sheet__tags tmads-bottom-sheet__tags--scroll">
        {TAG_LABELS.map((tag) => (
          <ChipsSmall key={tag} label={tag} />
        ))}
      </div>
      <Crowdedness />
      <div className="tmads-bottom-sheet__buttons">
        <LinkFurtherInfo />
        <div className="tmads-bottom-sheet__button-group">
          <button type="button" className="tmads-bottom-sheet__pill-button">
            <HeartGlyph />
            收藏
          </button>
          <button type="button" className="tmads-bottom-sheet__pill-button">
            <BellGlyph />
            追蹤園區動態
          </button>
          <button type="button" className="tmads-bottom-sheet__pill-button">
            <DownloadGlyph />
            下載離線地圖
          </button>
        </div>
      </div>
      <div className="tmads-bottom-sheet__hero">
        <img className="tmads-bottom-sheet__hero-image" src={heroPlaceholder} alt="" />
        <CarouselIndicators className="tmads-bottom-sheet__hero-indicators" />
      </div>
      <Button label="購買票券" size="Large" className="tmads-bottom-sheet__apply" />
    </div>
  );
}

function FilterMapSearchContent() {
  return (
    <div className="tmads-bottom-sheet__content tmads-bottom-sheet__content--map-search">
      {SCENE_CARDS.map((card) => (
        <CardScene key={card.siteName} siteName={card.siteName} distance={card.distance} showDistance />
      ))}
      <div className="tmads-bottom-sheet__scroll-spacer" aria-hidden="true" />
    </div>
  );
}

/**
 * Figma: Bottom Sheets (node 495:540) — Style=Filter_Discover/Map_Info/Filter_MapSearch.
 * The sheet chrome (drag handle, container, home indicator) reproduces the Figma
 * structure; each style's content nests the real catalogued components it uses in
 * Figma (SegmentedControls, AccordionCheckBox/AccordionChips, ChipsSalient/ChipsSmall,
 * Crowdedness, LinkFurtherInfo, CardScene, CarouselIndicators, Button, HomeIndicator)
 * rather than reimplementing their markup. The three "收藏/追蹤園區動態/下載離線地圖"
 * pill buttons in Map_Info aren't one of the 60 catalogued components (Figma's own
 * reference groups them ad hoc as "PrototypeButtons", with a for-set that doesn't
 * match the real IconButton component's Location/Save/OfflineMap options) — they're
 * built locally here, styled to match LinkFurtherInfo's pill visual.
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
      <HomeIndicator className="tmads-bottom-sheet__home-indicator" />
    </div>
  );
}
