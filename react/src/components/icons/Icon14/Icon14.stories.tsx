import type { Meta, StoryObj } from "@storybook/react";
import { Icon14, type Icon14Name } from "./Icon14";

const ALL_NAMES: Icon14Name[] = ["chevron", "secured"];

const meta: Meta<typeof Icon14> = {
  title: "Icons/Icon14",
  component: Icon14,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "chevron",
  },
};
export default meta;

type Story = StoryObj<typeof Icon14>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8 }}>
          <Icon14 name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
