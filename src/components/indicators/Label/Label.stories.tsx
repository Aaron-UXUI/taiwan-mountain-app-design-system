import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Indicators/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "radio", options: ["Open", "Partial", "Close", "family"] },
    label: { control: "text" },
  },
  args: {
    state: "Open",
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Open: Story = {};

export const Partial: Story = {
  args: { state: "Partial" },
};

export const Close: Story = {
  args: { state: "Close" },
};

export const Family: Story = {
  args: { state: "family" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Label state="Open" />
      <Label state="Partial" />
      <Label state="Close" />
      <Label state="family" />
    </div>
  ),
};
