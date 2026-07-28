import type { Meta, StoryObj } from "@storybook/react";

/**
 * Figma: Style Guide → Color (node `12948:43694`).
 *
 * The rows and their shade steps mirror the Style Guide exactly, including the
 * gaps — Primary has no 200/400, Accent has no 200/400/800, and the semantic
 * ramps only run 600–700. Grey's ends are labelled `0` and `900` there but are
 * named `gray-white` / `gray-black` in the token set; both names are shown so
 * the two can be reconciled.
 *
 * Every swatch reads its colour from the CSS variable rather than a literal, so
 * this page cannot drift from `tokens/design-tokens.json`.
 */
type Swatch = {
  /** Shade label as printed in the Figma Style Guide. */
  shade: string;
  variable: string;
  /** Set when the token's name does not match the Style Guide's label. */
  tokenName?: string;
  /** Swatches light enough to need dark text on top. */
  light?: boolean;
};

type Row = { group: string; swatches: Swatch[] };

const ROWS: Row[] = [
  {
    group: "Primary",
    swatches: [
      { shade: "50", variable: "--color-primary-green-50", light: true },
      { shade: "100", variable: "--color-primary-green-100", light: true },
      { shade: "700", variable: "--color-primary-green-700" },
      { shade: "800", variable: "--color-primary-green-800" },
      { shade: "900", variable: "--color-primary-green-900" },
    ],
  },
  {
    group: "Accent",
    swatches: [
      { shade: "50", variable: "--color-accent-yellow-50", light: true },
      { shade: "100", variable: "--color-accent-yellow-100", light: true },
      { shade: "700", variable: "--color-accent-yellow-700" },
      { shade: "900", variable: "--color-accent-yellow-900" },
    ],
  },
  {
    group: "Grey",
    swatches: [
      { shade: "0", variable: "--color-gray-white", tokenName: "gray-white", light: true },
      { shade: "50", variable: "--color-gray-50", light: true },
      { shade: "100", variable: "--color-gray-100", light: true },
      { shade: "200", variable: "--color-gray-200", light: true },
      { shade: "400", variable: "--color-gray-400", light: true },
      { shade: "800", variable: "--color-gray-800" },
      { shade: "900", variable: "--color-gray-black", tokenName: "gray-black" },
    ],
  },
  {
    group: "Danger",
    swatches: [
      { shade: "600", variable: "--color-semantic-destruct-600" },
      { shade: "700", variable: "--color-semantic-destruct-700" },
    ],
  },
  {
    group: "Success",
    swatches: [
      { shade: "600", variable: "--color-semantic-success-600" },
      { shade: "700", variable: "--color-semantic-success-700" },
    ],
  },
  {
    group: "Info",
    swatches: [
      { shade: "600", variable: "--color-semantic-info-600" },
      { shade: "700", variable: "--color-semantic-info-700" },
    ],
  },
];

function ColorPalette() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <h2 style={{ fontSize: 40, fontWeight: 400, margin: "0 0 24px" }}>Color</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {ROWS.map((row) => (
          <div key={row.group} style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 96, flexShrink: 0, fontSize: 16, fontWeight: 600 }}>{row.group}</div>
            <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
              {row.swatches.map((s) => (
                <div key={s.variable} style={{ textAlign: "center" }}>
                  <div
                    title={`var(${s.variable})`}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--radius-rounded)",
                      backgroundColor: `var(${s.variable})`,
                      color: s.light ? "var(--color-gray-black)" : "var(--color-gray-white)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 600,
                      // The `0` swatch is white on a white page; without this it
                      // would be invisible rather than merely subtle.
                      border: "1px solid var(--color-gray-100)",
                      boxSizing: "border-box",
                    }}
                  >
                    {s.shade}
                  </div>
                  <code style={{ display: "block", marginTop: 6, fontSize: 10, color: "var(--color-gray-800)" }}>
                    {s.tokenName ?? s.variable.replace("--color-", "")}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32, fontSize: 12, lineHeight: 1.6, color: "var(--color-gray-800)", maxWidth: 720 }}>
        Values come from <code>tokens/design-tokens.json</code>, generated from the Figma variable export. The ramps are
        deliberately sparse — Primary skips 200/400, Accent skips 200/400/800, and the semantic colours only define
        600 and 700 — so a missing step means the design has no such shade, not that one was left out here.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Style/Color",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => <ColorPalette />,
};
