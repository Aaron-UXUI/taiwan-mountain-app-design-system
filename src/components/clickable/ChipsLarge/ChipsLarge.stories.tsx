import type { Meta, StoryObj } from "@storybook/react";
import { ChipsLarge } from "./ChipsLarge";

const meta: Meta<typeof ChipsLarge> = {
  title: "Clickable/ChipsLarge",
  component: ChipsLarge,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    selected: { control: "boolean" },
  },
  args: {
    label: "景點",
    selected: false,
  },
};
export default meta;

type Story = StoryObj<typeof ChipsLarge>;

export const Unselected: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <ChipsLarge label="景點" selected={false} />
      <ChipsLarge label="景點" selected={true} />
    </div>
  ),
};
