import type { Meta, StoryObj } from "@storybook/react";
import { CardSavedItems } from "./CardSavedItems";

const meta: Meta<typeof CardSavedItems> = {
  title: "Containers/CardSavedItems",
  component: CardSavedItems,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    liked: { control: "text" },
    photos: { control: "object" },
  },
  args: {
    title: "台灣北部",
    liked: "3 個收藏",
  },
};
export default meta;

type Story = StoryObj<typeof CardSavedItems>;

export const Default: Story = {};
