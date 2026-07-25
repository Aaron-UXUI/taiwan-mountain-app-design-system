import type { Meta, StoryObj } from "@storybook/react";
import { BottomBar } from "./BottomBar";

const meta: Meta<typeof BottomBar> = {
  title: "Navigation/BottomBar",
  component: BottomBar,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["Button", "2 Buttons", "Navigation", "Place Order"] },
    buttonLabel: { control: "text" },
    secondaryLabel: { control: "text" },
    navigationState: { control: "radio", options: ["activity", "map", "notify", "member"] },
    ticketTitle: { control: "text" },
    priceCurrency: { control: "text" },
    price: { control: "text" },
  },
  args: {
    type: "Button",
    buttonLabel: "按鈕",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BottomBar>;

export const SingleButton: Story = {};

export const TwoButtons: Story = {
  args: { type: "2 Buttons" },
};

export const Navigation: Story = {
  args: { type: "Navigation" },
};

export const PlaceOrder: Story = {
  args: { type: "Place Order" },
};
