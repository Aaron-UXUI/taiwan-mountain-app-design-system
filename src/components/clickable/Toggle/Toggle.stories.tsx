import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Clickable/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    active: true,
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Active: Story = {};

export const Inactive: Story = {
  args: { active: false },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Toggle active={false} />
      <Toggle active={true} />
    </div>
  ),
};
