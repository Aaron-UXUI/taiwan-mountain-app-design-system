import type { Meta, StoryObj } from "@storybook/react";

type Row = {
  level: number;
  cssValue: string;
  usedBy: string[];
};

const ROWS: Row[] = [
  {
    level: 1,
    cssValue: "0 1px 2px 0 var(--color-gray-100)",
    usedBy: ["clickable/SegmentedControls"],
  },
  {
    level: 2,
    cssValue: "0 1px 4px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.08)",
    usedBy: ["navigation/BottomBar"],
  },
  {
    level: 3,
    cssValue: "0 2px 1px rgba(0,0,0,.12), 0 2px 12px rgba(0,0,0,.12)",
    usedBy: [
      "clickable/Button",
      "clickable/LinkFurtherInfo",
      "clickable/UserLocation",
      "disclosure/BottomSheet",
      "indicators/Snackbar",
      "navigation/SearchBar",
    ],
  },
  {
    level: 4,
    cssValue: "0 6px 20px rgba(0,0,0,.12)",
    usedBy: ["clickable/IconButton", "clickable/LocationPin", "disclosure/Tooltip"],
  },
  {
    level: 5,
    cssValue: "0 8px 32px rgba(0,0,0,.16), 0 2px 4px rgba(0,0,0,.12)",
    usedBy: ["navigation/SearchBar"],
  },
];

const UNMAPPED = [
  {
    component: "ios-system/Keyboard",
    value: "0 1px 0 rgba(0,0,0,.3)",
    note: "Keycap bottom-edge shadow — no blur radius, doesn't match any Elevation level. Likely intentional OS-chrome mimicry rather than a design-system elevation.",
  },
  {
    component: "ios-system/KeyboardNumbers",
    value: "0 1px 0 rgba(0,0,0,.35)",
    note: "Same keycap-shadow pattern as Keyboard, but with a different opacity (.35 vs .3) — inconsistent even between the two keyboard components.",
  },
];

function ElevationSwatches() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <p style={{ marginBottom: 16, color: "var(--color-gray-800)" }}>
        Every Elevation level defined in <code>src/tokens.css</code>, sourced from the Figma file's
        🔶 Design System → Style Guide → Elevation frame (node 12948:43756).
      </p>
      <div style={{ display: "flex", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
        {ROWS.map((row) => (
          <div key={row.level} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "var(--radius-xs)",
                background: "var(--color-gray-white)",
                boxShadow: `var(--elevation-${row.level})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {row.level}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Elevation/{row.level}</div>
          </div>
        ))}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-gray-200)" }}>
            <th style={{ padding: "8px 12px" }}>Level</th>
            <th style={{ padding: "8px 12px" }}>box-shadow</th>
            <th style={{ padding: "8px 12px" }}>Used by</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.level} style={{ borderBottom: "1px solid var(--color-gray-100)" }}>
              <td style={{ padding: "12px", fontWeight: 600 }}>Elevation/{row.level}</td>
              <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 12 }}>{row.cssValue}</td>
              <td style={{ padding: "12px", fontSize: 12, color: "var(--color-gray-800)" }}>
                {row.usedBy.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 32, fontSize: 16 }}>Not mapped to any Elevation level</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-gray-200)" }}>
            <th style={{ padding: "8px 12px" }}>Component</th>
            <th style={{ padding: "8px 12px" }}>box-shadow</th>
            <th style={{ padding: "8px 12px" }}>Note</th>
          </tr>
        </thead>
        <tbody>
          {UNMAPPED.map((row) => (
            <tr key={row.component} style={{ borderBottom: "1px solid var(--color-gray-100)" }}>
              <td style={{ padding: "12px", fontWeight: 600 }}>{row.component}</td>
              <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 12 }}>{row.value}</td>
              <td style={{ padding: "12px", fontSize: 12, color: "var(--color-semantic-destruct-700)" }}>
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Elevation",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};
export default meta;

type Story = StoryObj;

export const AllCombinations: Story = {
  render: () => <ElevationSwatches />,
};
