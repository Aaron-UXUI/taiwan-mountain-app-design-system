import type { Meta, StoryObj } from "@storybook/react";
import { LinkFurtherInfo } from "./LinkFurtherInfo";

const meta: Meta<typeof LinkFurtherInfo> = {
  title: "Clickable/LinkFurtherInfo",
  component: LinkFurtherInfo,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
  },
  args: {
    label: "更多資訊",
    href: "#",
  },
};
export default meta;

type Story = StoryObj<typeof LinkFurtherInfo>;

export const Default: Story = {};
