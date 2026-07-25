import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Disclosure/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const ShortText: Story = {
  args: { text: "點擊以查看更多資訊" },
};
