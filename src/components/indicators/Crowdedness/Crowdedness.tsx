import "./Crowdedness.css";

export type CrowdednessState = "Comfortable" | "Partial Crowded" | "Crowded";

const STATE_TEXT: Record<CrowdednessState, string> = {
  Comfortable: "舒適",
  "Partial Crowded": "略多",
  Crowded: "擁擠",
};

const STATE_MODIFIER: Record<CrowdednessState, string> = {
  Comfortable: "comfortable",
  "Partial Crowded": "partial-crowded",
  Crowded: "crowded",
};

export type CrowdednessProps = {
  state?: CrowdednessState;
  label?: string;
  className?: string;
};

/** Figma: Crowdedness (node 15975:7322) — State=Comfortable/Partial Crowded/Crowded. */
export function Crowdedness({ state = "Comfortable", label = "即時人潮狀況", className }: CrowdednessProps) {
  return (
    <div className={["tmads-crowdedness", className].filter(Boolean).join(" ")}>
      <span className="tmads-crowdedness__label">{label}</span>
      <span className={`tmads-crowdedness__badge tmads-crowdedness__badge--${STATE_MODIFIER[state]}`}>
        {STATE_TEXT[state]}
      </span>
    </div>
  );
}
