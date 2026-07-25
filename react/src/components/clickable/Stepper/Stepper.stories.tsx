import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Clickable/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: "number" },
    state: { control: "radio", options: ["Default", "Error", "Disabled"] },
    errorMessage: { control: "text" },
  },
  args: {
    amount: 0,
    state: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const Error: Story = {
  args: { state: "Error", amount: 11 },
};

export const Disabled: Story = {
  args: { state: "Disabled" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Stepper state="Default" amount={0} />
      <Stepper state="Error" amount={11} />
      <Stepper state="Disabled" amount={0} />
    </div>
  ),
};
