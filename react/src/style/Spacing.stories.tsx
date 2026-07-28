import type { Meta, StoryObj } from "@storybook/react";

/**
 * Figma: Style Guide → Spacing (node `12948:43828`).
 *
 * The Style Guide pairs the scale with a device illustration showing the 24pt
 * screen gutter, which is why `lm` is the one step that shows up on nearly
 * every screen-level container. That relationship is called out below rather
 * than redrawing the phone.
 */
type SpacingToken = { label: string; variable: string; token: string };

const SPACING: SpacingToken[] = [
  { label: "0", variable: "--spacing-0", token: "spacing.0" },
  { label: "4", variable: "--spacing-xs", token: "spacing.xs" },
  { label: "8", variable: "--spacing-s", token: "spacing.s" },
  { label: "12", variable: "--spacing-sm", token: "spacing.sm" },
  { label: "16", variable: "--spacing-m", token: "spacing.m" },
  { label: "24", variable: "--spacing-lm", token: "spacing.lm" },
  { label: "32", variable: "--spacing-l", token: "spacing.l" },
  { label: "40", variable: "--spacing-xl", token: "spacing.xl" },
  { label: "48", variable: "--spacing-2xl", token: "spacing.2xl" },
  { label: "56", variable: "--spacing-3xl", token: "spacing.3xl" },
  { label: "64", variable: "--spacing-4xl", token: "spacing.4xl" },
];

function SpacingScale() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <h2 style={{ fontSize: 40, fontWeight: 400, margin: "0 0 24px" }}>Spacing</h2>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {SPACING.map((s) => (
          <div key={s.variable} style={{ textAlign: "center" }}>
            <div
              title={`var(${s.variable})`}
              style={{
                width: 60,
                height: 60,
                border: "1px solid var(--color-gray-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                boxSizing: "border-box",
              }}
            >
              {s.label}
            </div>
            <code style={{ display: "block", marginTop: 6, fontSize: 10, color: "var(--color-gray-800)" }}>
              {s.token}
            </code>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 600, margin: "40px 0 12px" }}>Relative scale</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 720 }}>
        {SPACING.filter((s) => s.label !== "0").map((s) => (
          <div key={s.variable} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <code style={{ width: 110, flexShrink: 0, fontSize: 11, color: "var(--color-gray-800)" }}>{s.token}</code>
            <div
              style={{
                width: `var(${s.variable})`,
                height: 16,
                backgroundColor: "var(--color-primary-green-800)",
                borderRadius: "var(--radius-xxs)",
              }}
            />
            <span style={{ fontSize: 12, color: "var(--color-gray-800)" }}>{s.label}px</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32, fontSize: 12, lineHeight: 1.6, color: "var(--color-gray-800)", maxWidth: 720 }}>
        The Style Guide illustrates <code>spacing.lm</code> (24) as the screen gutter — it is the standard left/right
        inset for screen-level containers such as BottomSheet, ProgressIndicator and PaymentInfo, which is why it
        appears far more often than its neighbours.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Style/Spacing",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => <SpacingScale />,
};
