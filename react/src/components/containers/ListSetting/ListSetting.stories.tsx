import type { Meta, StoryObj } from "@storybook/react";
import { ListSetting } from "./ListSetting";

const meta: Meta<typeof ListSetting> = {
  title: "Containers/ListSetting",
  component: ListSetting,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    showChevron: { control: "boolean" },
  },
  args: {
    text: "管理登入方式",
    showChevron: true,
  },
};
export default meta;

type Story = StoryObj<typeof ListSetting>;

export const Default: Story = {};

export const WithoutChevron: Story = {
  args: { showChevron: false },
};
