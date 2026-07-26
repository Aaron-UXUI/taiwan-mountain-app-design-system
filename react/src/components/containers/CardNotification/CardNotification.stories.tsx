import type { Meta, StoryObj } from "@storybook/react";
import { CardNotification } from "./CardNotification";

const meta: Meta<typeof CardNotification> = {
  title: "Containers/CardNotification",
  component: CardNotification,
  tags: ["autodocs"],
  argTypes: {
    infoMain: { control: "text" },
    infoContent: { control: "text" },
    time: { control: "text" },
    showBadge: { control: "boolean" },
  },
  args: {
    infoMain: "阿里山林鐵因西南風帶來豪雨 仍有多處崩落土石待清理",
    infoContent: "受低壓帶影響，中央氣象署今上午 9 點 50 分對3 縣市發布陸上強風特報，請多留意。",
    time: "2025/12/23",
    showBadge: false,
  },
};
export default meta;

type Story = StoryObj<typeof CardNotification>;

export const Default: Story = {};

export const Unread: Story = {
  args: { showBadge: true },
};
