import type { Meta, StoryObj } from "@storybook/react";
import { Keyboard } from "./Keyboard";

const meta: Meta<typeof Keyboard> = {
  title: "IosSystem/Keyboard",
  component: Keyboard,
  tags: ["autodocs"],
  argTypes: {
    returnKeyLabel: { control: "text" },
    spaceKeyLabel: { control: "text" },
  },
  args: {
    returnKeyLabel: "搜尋",
    spaceKeyLabel: "空格",
  },
};
export default meta;

type Story = StoryObj<typeof Keyboard>;

export const Default: Story = {};
