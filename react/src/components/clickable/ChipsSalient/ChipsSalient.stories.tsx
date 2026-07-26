import type { Meta, StoryObj } from "@storybook/react";
import { ChipsSalient } from "./ChipsSalient";

const meta: Meta<typeof ChipsSalient> = {
  title: "Clickable/ChipsSalient",
  component: ChipsSalient,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    type: { control: "radio", options: ["General", "Special", "Warning"] },
  },
  args: {
    label: "內容",
    type: "General",
  },
};
export default meta;

type Story = StoryObj<typeof ChipsSalient>;

export const General: Story = {};

export const Special: Story = {
  args: { type: "Special" },
};

export const Warning: Story = {
  args: { type: "Warning" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["General", "Special", "Warning"] as const).map((type) => (
        <ChipsSalient key={type} label="內容" type={type} />
      ))}
    </div>
  ),
};
