import "./Badge.css";

export type BadgeAttribute = "Small" | "Large" | "Maximum";
export type BadgeFor = "Accordion" | "Notification";

/**
 * Figma authors 4 of the 6 `Attribute × For` combinations, so the props are a
 * union rather than two free axes — `Large/Accordion` and `Maximum/Accordion`
 * do not exist in the design and are not expressible here.
 */
export type BadgeVariant =
  | { for?: "Accordion"; attribute?: "Small" }
  | { for: "Notification"; attribute?: BadgeAttribute };

export type BadgeProps = {
  count?: string;
  className?: string;
} & BadgeVariant;

/**
 * Figma: Badge (node 8233:6131) — `Small/Accordion`, `Small/Notification`,
 * `Large/Notification`, `Maximum/Notification`.
 *
 * `Small` means two different things by context, which is the design's own
 * shape: on a Notification badge it is the bare dot (no number), on an
 * Accordion badge it is the counted pill.
 */
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
