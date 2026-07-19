import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Indicators/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["Default"] },
    label: { control: "text" },
  },
  args: {
    type: "Default",
    label: "無法連上網路，離線使用中",
  },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {};
