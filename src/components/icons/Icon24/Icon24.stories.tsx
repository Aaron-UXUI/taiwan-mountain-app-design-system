import type { Meta, StoryObj } from "@storybook/react";
import { Icon24, type Icon24Name } from "./Icon24";

const ALL_NAMES: Icon24Name[] = [
  "map",
  "map-filled",
  "search",
  "search-filled",
  "notify",
  "notify-filled",
  "member",
  "member-filled",
  "heart",
  "heart-filled",
  "radio",
  "radio-filled",
  "gps",
  "gps-filled",
  "setting",
  "more",
  "filter",
  "back",
  "close",
  "minus",
  "plus",
  "download",
];

const meta: Meta<typeof Icon24> = {
  title: "Icons/Icon24",
  component: Icon24,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "map",
  },
};
export default meta;

type Story = StoryObj<typeof Icon24>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 16,
        fontFamily: "var(--typeface-pingfang-tc)",
      }}
    >
      {ALL_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: 8,
          }}
        >
          <Icon24 name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
