import type { Meta, StoryObj } from "@storybook/react";
import { PaymentInfo } from "./PaymentInfo";

const meta: Meta<typeof PaymentInfo> = {
  title: "Indicators/PaymentInfo",
  component: PaymentInfo,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "radio", options: ["Selected", "Unselected"] },
    title: { control: "text" },
    total: { control: "text" },
  },
  args: {
    state: "Selected",
    title: "內洞國家森林遊樂區",
    total: "425",
  },
};
export default meta;

type Story = StoryObj<typeof PaymentInfo>;

export const Selected: Story = {};

export const Unselected: Story = {
  args: { state: "Unselected" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PaymentInfo state="Selected" />
      <PaymentInfo state="Unselected" />
    </div>
  ),
};
