import "./OfflineMap.css";

export type OfflineMapSignalMissing = "Some" | "Most";

type CarrierRow = {
  key: string;
  name: string;
  status: string;
  level: "partial" | "unstable" | "stable";
};

const EXPANDED_ROWS: CarrierRow[] = [
  { key: "cht", name: "中華電信網路訊號", status: "部分區域不穩定", level: "partial" },
  { key: "taiwan-mobile", name: "台灣大哥大網路訊號", status: "部分區域不穩定", level: "partial" },
  { key: "fet", name: "遠傳電信網路訊號", status: "全部區域皆穩定", level: "stable" },
];

const COLLAPSED_STATUS: Record<OfflineMapSignalMissing, { text: string; level: CarrierRow["level"] }> = {
  Some: { text: "部分區域不穩定", level: "partial" },
  Most: { text: "多數區域不穩定", level: "unstable" },
};

function CarrierIcon({ label }: { label: string }) {
  return (
    <span className="tmads-offline-map__carrier-icon" aria-hidden="true">
      {label}
    </span>
  );
}

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg
      className="tmads-offline-map__chevron"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ transform: up ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M4 5.5L7 8.5L10 5.5"
        stroke="var(--color-gray-800)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type OfflineMapProps = {
  signalMissing?: OfflineMapSignalMissing;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
};

/**
 * Figma: OfflineMap (node 16343:7890) — Signal Missing=Some/Most × Expanded?=No/Yes.
 * Figma only defines an expanded view for one combination (a variant literally named
 * "Signal Missing3") which always renders the same 3-carrier breakdown regardless of the
 * collapsed signalMissing value — so `expanded` intentionally ignores `signalMissing` here.
 */
export function OfflineMap({ signalMissing = "Some", expanded = false, onToggle, className }: OfflineMapProps) {
  if (expanded) {
    return (
      <div className={["tmads-offline-map", className].filter(Boolean).join(" ")}>
        {EXPANDED_ROWS.map((row, index) => (
          <button
            key={row.key}
            type="button"
            className="tmads-offline-map__row"
            onClick={index === 0 ? onToggle : undefined}
          >
            <span className="tmads-offline-map__provider">
              <CarrierIcon label={row.name[0]} />
              <span className="tmads-offline-map__provider-name">{row.name}</span>
            </span>
            <span className={`tmads-offline-map__signal tmads-offline-map__signal--${row.level}`}>
              {row.status}
            </span>
            {index === 0 && <Chevron up />}
          </button>
        ))}
      </div>
    );
  }

  const collapsed = COLLAPSED_STATUS[signalMissing];

  return (
    <div className={["tmads-offline-map", className].filter(Boolean).join(" ")}>
      <button type="button" className="tmads-offline-map__row" onClick={onToggle}>
        <span className="tmads-offline-map__provider">
          <CarrierIcon label="中" />
          <span className="tmads-offline-map__provider-name">中華電信網路訊號</span>
        </span>
        <span className={`tmads-offline-map__signal tmads-offline-map__signal--${collapsed.level}`}>
          {collapsed.text}
        </span>
        <Chevron />
      </button>
    </div>
  );
}
