import type { Meta, StoryObj } from "@storybook/react";
import { ChipsSmall } from "./ChipsSmall";

const meta: Meta<typeof ChipsSmall> = {
  title: "Clickable/ChipsSmall",
  component: ChipsSmall,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
  },
  args: {
    label: "內容",
    active: false,
  },
};
export default meta;

type Story = StoryObj<typeof ChipsSmall>;

export const Inactive: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <ChipsSmall label="內容" active={false} />
      <ChipsSmall label="內容" active={true} />
    </div>
  ),
};
