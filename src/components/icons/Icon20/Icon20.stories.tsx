import type { Meta, StoryObj } from "@storybook/react";
import { Icon20, type Icon20Name } from "./Icon20";

const ALL_NAMES: Icon20Name[] = ["search", "microphone", "check", "info", "credit-card", "close-eye", "open-eye"];

const meta: Meta<typeof Icon20> = {
  title: "Icons/Icon20",
  component: Icon20,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "search",
  },
};
export default meta;

type Story = StoryObj<typeof Icon20>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 16, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8 }}>
          <Icon20 name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
