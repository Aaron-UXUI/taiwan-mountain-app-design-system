import type { Meta, StoryObj } from "@storybook/react";
import { Icon16, type Icon16Name } from "./Icon16";

const ALL_NAMES: Icon16Name[] = ["exclamation", "arrow-up-right", "notified", "non-notified", "heart", "heart-filled"];

const meta: Meta<typeof Icon16> = {
  title: "Icons/Icon16",
  component: Icon16,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "exclamation",
  },
};
export default meta;

type Story = StoryObj<typeof Icon16>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8 }}>
          <Icon16 name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
