import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Icons/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["Large", "Small"] },
  },
  args: {
    size: "Large",
  },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", fontFamily: "var(--typeface-pingfang-tc)" }}>
      {(["Large", "Small"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Logo size={size} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
