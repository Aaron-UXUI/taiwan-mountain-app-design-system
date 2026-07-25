import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Indicators/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    showCloseButton: { control: "boolean" },
  },
  args: {
    label: "離線地圖下載完成，現在即使沒有網路連結，也可以查看內洞國家森林遊樂區",
    showCloseButton: true,
  },
};
export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {};

export const WithoutCloseButton: Story = {
  args: { showCloseButton: false },
};
