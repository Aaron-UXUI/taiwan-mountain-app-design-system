import type { Meta, StoryObj } from "@storybook/react";
import { CardTickets } from "./CardTickets";

const meta: Meta<typeof CardTickets> = {
  title: "Containers/CardTickets",
  component: CardTickets,
  tags: ["autodocs"],
  argTypes: {
    scene: { control: "text" },
    ticketType: { control: "text" },
    additionalItem: { control: "text" },
    due: { control: "text" },
    price: { control: "text" },
    state: { control: "radio", options: ["Default", "Disabled"] },
  },
  args: {
    scene: "阿里山國家森林遊樂區",
    ticketType: "全票 x 1",
    additionalItem: "烏來臺車來回搭乘券 x 1",
    due: "使用期限 2026/09/10",
    price: "NT$ 425",
    state: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof CardTickets>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { state: "Disabled" },
};
