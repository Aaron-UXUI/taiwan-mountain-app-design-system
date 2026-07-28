import type { Meta, StoryObj } from "@storybook/react";

/**
 * Figma: Style Guide → Radius (node `12948:43758`).
 *
 * The Style Guide draws each step as a single rounded corner rather than a
 * fully rounded box, which is what makes the difference between 12 and 16
 * legible at all — reproduced here for the same reason.
 */
type RadiusToken = { label: string; variable: string; token: string };

const RADII: RadiusToken[] = [
  { label: "0", variable: "--radius-none", token: "radius.none" },
  { label: "4", variable: "--radius-xxs", token: "radius.xxs" },
  { label: "8", variable: "--radius-xs", token: "radius.xs" },
  { label: "12", variable: "--radius-s", token: "radius.s" },
  { label: "16", variable: "--radius-m", token: "radius.m" },
  { label: "Rounded", variable: "--radius-rounded", token: "radius.rounded" },
];

function RadiusScale() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <h2 style={{ fontSize: 40, fontWeight: 400, margin: "0 0 24px" }}>Radius</h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {RADII.map((r) => (
          <div key={r.variable} style={{ textAlign: "center" }}>
            <div
              title={`var(${r.variable})`}
              style={{
                width: r.label === "Rounded" ? 90 : 60,
                height: 60,
                // Only the top-left corner is rounded, as in the Style Guide.
                borderTopLeftRadius: `var(${r.variable})`,
                borderTop: "1px solid var(--color-gray-400)",
                borderLeft: "1px solid var(--color-gray-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                boxSizing: "border-box",
              }}
            >
              {r.label}
            </div>
            <code style={{ display: "block", marginTop: 6, fontSize: 10, color: "var(--color-gray-800)" }}>
              {r.token}
            </code>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32, fontSize: 12, lineHeight: 1.6, color: "var(--color-gray-800)", maxWidth: 720 }}>
        <strong>Rounded</strong> is a fully-rounded shape, not a number. It ships as{" "}
        <code>--radius-rounded: 9999px</code> for CSS, but is deliberately <em>not</em> exposed as a SwiftUI constant —
        use <code>Capsule()</code> there instead, so the shape stays correct at any size rather than relying on an
        arbitrarily large corner.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Style/Radius",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => <RadiusScale />,
};
