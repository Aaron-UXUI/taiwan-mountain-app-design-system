import type { Meta, StoryObj } from "@storybook/react";

type Row = {
  category: string;
  level: string;
  sizeVar: string;
  lineHeightVar: string;
  weight: string;
  family: string;
  usedBy: string[];
  note?: string;
};

const ROWS: Row[] = [
  {
    category: "Heading",
    level: "H1",
    sizeVar: "--type-scale-headline-1",
    lineHeightVar: "--line-height-h1",
    weight: "Regular",
    family: "PingFang TC",
    usedBy: ["indicators/PaymentInfo", "navigation/BottomBar"],
    note: "Style Guide documents this level as Regular weight + 2% letter-spacing, unlike every other Heading level (all Semibold/0%) — likely a documentation error, kept as-is pending confirmation in Figma.",
  },
  {
    category: "Heading",
    level: "H2",
    sizeVar: "--type-scale-headline-2",
    lineHeightVar: "--line-height-h2",
    weight: "Semibold",
    family: "PingFang TC",
    usedBy: [],
    note: "Defined for completeness; no component uses it yet.",
  },
  {
    category: "Heading",
    level: "H3",
    sizeVar: "--type-scale-headline-3",
    lineHeightVar: "--line-height-h3",
    weight: "Semibold",
    family: "PingFang TC",
    usedBy: ["containers/CardDescription", "containers/CardScene", "disclosure/BottomSheet", "indicators/PaymentInfo", "navigation/BottomBar"],
  },
  {
    category: "Heading",
    level: "H4",
    sizeVar: "--type-scale-headline-4",
    lineHeightVar: "--line-height-h4",
    weight: "Semibold",
    family: "PingFang TC",
    usedBy: ["clickable/Button", "clickable/LocationPin", "disclosure/Tab"],
  },
  {
    category: "Body",
    level: "L",
    sizeVar: "--type-scale-body-l",
    lineHeightVar: "--line-height-body-l",
    weight: "Regular",
    family: "PingFang TC",
    usedBy: [
      "clickable/RadioButton",
      "clickable/TextField",
      "containers/ListDownloadMap",
      "containers/ListNotification",
      "containers/ListSetting",
      "containers/ListWeather",
      "disclosure/BottomSheet",
      "disclosure/Tab",
      "navigation/AppBar",
      "navigation/SearchBar",
    ],
  },
  {
    category: "Body",
    level: "M",
    sizeVar: "--type-scale-body-m",
    lineHeightVar: "--line-height-body-m",
    weight: "Regular",
    family: "PingFang TC",
    usedBy: [
      "clickable/Button",
      "clickable/CheckBox",
      "clickable/ChipsLarge",
      "clickable/IconButton",
      "clickable/Link",
      "clickable/LinkFurtherInfo",
      "clickable/RadioButton",
      "clickable/SegmentedControls",
      "clickable/TextField",
      "containers/CardDescription",
      "containers/CardNotification",
      "containers/CardSavedItems",
      "containers/CardTickets",
      "disclosure/AccordionCheckBox",
      "disclosure/AccordionChips",
      "disclosure/BottomSheet",
      "disclosure/CollapseText",
      "disclosure/Tab",
      "indicators/Crowdedness",
      "indicators/OfflineMap",
      "indicators/PaymentInfo",
      "indicators/ProgressIndicator",
      "indicators/Snackbar",
      "ios-system/Keyboard",
      "ios-system/KeyboardNumbers",
      "ios-system/StatusBar",
      "navigation/AppBar",
      "navigation/BottomBar",
    ],
  },
  {
    category: "Body",
    level: "S",
    sizeVar: "--type-scale-body-s",
    lineHeightVar: "--line-height-body-s",
    weight: "Regular",
    family: "PingFang TC",
    usedBy: [
      "clickable/ChipsSalient",
      "clickable/ChipsSmall",
      "clickable/Stepper",
      "clickable/TextField",
      "containers/CardNotification",
      "containers/CardSavedItems",
      "containers/CardScene",
      "containers/CardTickets",
      "containers/ListWeather",
      "disclosure/Tab",
      "disclosure/Tooltip",
      "indicators/Badge",
      "indicators/Banner",
      "indicators/Label",
      "indicators/PaymentInfo",
      "navigation/BottomBar",
      "navigation/CheckBoxNavigation",
      "navigation/SearchBar",
    ],
  },
  {
    category: "Label",
    level: "M",
    sizeVar: "--type-scale-label-m",
    lineHeightVar: "--line-height-label-m",
    weight: "Semibold",
    family: "PingFang TC",
    usedBy: [],
    note: "Defined for completeness; no component uses it yet.",
  },
  {
    category: "Label",
    level: "S",
    sizeVar: "--type-scale-label-s",
    lineHeightVar: "--line-height-label-s",
    weight: "Semibold",
    family: "PingFang TC",
    usedBy: [],
    note: "Defined for completeness; no component uses it yet.",
  },
  {
    category: "Number",
    level: "L",
    sizeVar: "--type-scale-number-l",
    lineHeightVar: "--line-height-number",
    weight: "Semibold",
    family: "SF Mono",
    usedBy: ["clickable/Stepper"],
  },
  {
    category: "Number",
    level: "M",
    sizeVar: "--type-scale-number-m",
    lineHeightVar: "--line-height-number",
    weight: "Regular",
    family: "SF Mono",
    usedBy: [],
    note: "Style Guide documents identical 16/24 values as Number/L — only the weight differs; may be a copy-paste artifact in the source file. No component uses this level yet.",
  },
];

function TypographyTable() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <p style={{ marginBottom: 16, color: "var(--color-gray-800)" }}>
        Every Typography combination defined in <code>src/tokens.css</code>, sourced from the Figma file's
        🔶 Design System → Style Guide → Typography frame (node 12948:43690). "Used by" lists every
        component currently rendering at that level.
      </p>
      <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-gray-200)" }}>
            <th style={{ padding: "8px 12px" }}>Category / Level</th>
            <th style={{ padding: "8px 12px" }}>Sample</th>
            <th style={{ padding: "8px 12px" }}>Size / Line-height</th>
            <th style={{ padding: "8px 12px" }}>Weight</th>
            <th style={{ padding: "8px 12px" }}>Family</th>
            <th style={{ padding: "8px 12px", minWidth: 280 }}>Used by</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.sizeVar} style={{ borderBottom: "1px solid var(--color-gray-100)" }}>
              <td style={{ padding: "12px", whiteSpace: "nowrap", fontWeight: 600 }}>
                {row.category}/{row.level}
              </td>
              <td style={{ padding: "12px", whiteSpace: "nowrap" }}>
                <span
                  style={{
                    fontFamily: `var(${row.family === "SF Mono" ? "--typeface-sf-mono" : "--typeface-pingfang-tc"})`,
                    fontWeight: row.weight === "Semibold" ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
                    fontSize: `var(${row.sizeVar})`,
                    lineHeight: `var(${row.lineHeightVar})`,
                    whiteSpace: "nowrap",
                  }}
                >
                  台灣 Aa
                </span>
              </td>
              <td style={{ padding: "12px", whiteSpace: "nowrap", fontFamily: "monospace", fontSize: 12 }}>
                {row.sizeVar} / {row.lineHeightVar}
              </td>
              <td style={{ padding: "12px" }}>{row.weight}</td>
              <td style={{ padding: "12px" }}>{row.family}</td>
              <td style={{ padding: "12px", fontSize: 12, color: "var(--color-gray-800)" }}>
                {row.usedBy.length > 0 ? row.usedBy.join(", ") : <em>none yet</em>}
                {row.note && (
                  <div style={{ marginTop: 4, color: "var(--color-semantic-destruct-700)" }}>⚠ {row.note}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};
export default meta;

type Story = StoryObj;

export const AllCombinations: Story = {
  render: () => <TypographyTable />,
};
