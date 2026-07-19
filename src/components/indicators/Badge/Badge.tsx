import "./Badge.css";

export type BadgeAttribute = "Small" | "Large" | "Maximum";
export type BadgeFor = "Accordion" | "Notification";

export type BadgeProps = {
  attribute?: BadgeAttribute;
  for?: BadgeFor;
  count?: string;
  className?: string;
};

/** Figma: Badge (node 8233:6131) — Attribute=Small/Large/Maximum × For=Accordion/Notification. */
export function Badge({ attribute = "Small", for: badgeFor = "Accordion", count, className }: BadgeProps) {
  const isNotification = badgeFor === "Notification";

  if (isNotification && attribute === "Small") {
    return (
      <div
        className={["tmads-badge", "tmads-badge--dot", className].filter(Boolean).join(" ")}
        aria-hidden="true"
      />
    );
  }

  const text = isNotification ? (attribute === "Maximum" ? "99+" : count ?? "3") : count ?? "0";

  return (
    <div
      className={[
        "tmads-badge",
        "tmads-badge--pill",
        isNotification ? "tmads-badge--notification" : "tmads-badge--accordion",
        attribute === "Maximum" ? "tmads-badge--auto-width" : "tmads-badge--fixed-width",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </div>
  );
}
