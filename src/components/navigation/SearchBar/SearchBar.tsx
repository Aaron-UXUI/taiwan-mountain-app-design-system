import type { HTMLAttributes } from "react";
import "./SearchBar.css";

export type SearchBarState = "Default" | "Focused" | "Typing";

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  state?: SearchBarState;
  historyItems?: string[];
  suggestionItems?: string[];
  onFilterClick?: () => void;
  onCancelClick?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const SearchGlyph = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M17 17L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MicGlyph = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
    <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" fill="var(--color-gray-800)" />
    <path d="M5 9.5C5 12.5 7.2 15 10 15C12.8 15 15 12.5 15 9.5" stroke="var(--color-gray-800)" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10 15V17.5" stroke="var(--color-gray-800)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const FilterGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M4 7H20M7 12H17M10 17H14" stroke="var(--color-gray-black)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CloseGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M6 6L18 18M18 6L6 18" stroke="var(--color-gray-black)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/**
 * Figma: Search Bar (node 376:456) — State=Default/Focused/Typing (Typed removed per request).
 * Default renders the standalone search input row; Focused/Typing additionally
 * render a suggestions/history menu above a compact input row with a cancel button.
 */
export function SearchBar({
  placeholder = "搜尋",
  value,
  state = "Default",
  historyItems = ["鳩之澤", "阿里山"],
  suggestionItems = ["烏來老街", "烏來瀑布", "烏山獼猴保育區"],
  onFilterClick,
  onCancelClick,
  className,
  ...rest
}: SearchBarProps) {
  const resolvedValue = value ?? (state === "Typing" ? "烏" : "");
  const showMenu = state === "Focused" || state === "Typing";
  const menuItems = state === "Typing" ? suggestionItems : historyItems;
  const showCursor = state === "Focused" || state === "Typing";

  return (
    <div className={["tmads-search-bar", className].filter(Boolean).join(" ")} {...rest}>
      {showMenu && (
        <div className="tmads-search-bar__menu">
          {state === "Focused" && <p className="tmads-search-bar__menu-title">歷史紀錄</p>}
          {menuItems.map((item) => (
            <p key={item} className="tmads-search-bar__menu-item">
              {item}
            </p>
          ))}
        </div>
      )}
      <div className={`tmads-search-bar__row ${state === "Default" ? "tmads-search-bar__row--default" : ""}`}>
        <div
          className={[
            "tmads-search-bar__field",
            (state === "Focused" || state === "Typing") && "tmads-search-bar__field--compact",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="tmads-search-bar__icon">
            <SearchGlyph />
          </span>
          {state === "Default" ? (
            <span className="tmads-search-bar__placeholder">{placeholder}</span>
          ) : (
            <span className="tmads-search-bar__value">
              {resolvedValue}
              {showCursor && <span className="tmads-search-bar__cursor" aria-hidden="true" />}
            </span>
          )}
          {state === "Default" && (
            <button type="button" className="tmads-search-bar__mic-inline" aria-label="語音搜尋">
              <MicGlyph />
            </button>
          )}
          {state !== "Default" && (
            <button type="button" className="tmads-search-bar__mic-abs" aria-label="語音搜尋">
              <MicGlyph />
            </button>
          )}
        </div>
        {state === "Default" ? (
          <button type="button" className="tmads-search-bar__action" onClick={onFilterClick} aria-label="篩選">
            <FilterGlyph />
          </button>
        ) : (
          <button type="button" className="tmads-search-bar__action" onClick={onCancelClick} aria-label="取消">
            <CloseGlyph />
          </button>
        )}
      </div>
    </div>
  );
}
