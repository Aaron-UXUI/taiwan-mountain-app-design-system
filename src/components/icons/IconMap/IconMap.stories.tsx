import type { Meta, StoryObj } from "@storybook/react";
import { IconMap, type IconMapName } from "./IconMap";

const ALL_NAMES: IconMapName[] = ["tree", "camera", "walk", "info"];

const meta: Meta<typeof IconMap> = {
  title: "Icons/IconMap",
  component: IconMap,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "tree",
  },
};
export default meta;

type Story = StoryObj<typeof IconMap>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8 }}>
          <IconMap name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
