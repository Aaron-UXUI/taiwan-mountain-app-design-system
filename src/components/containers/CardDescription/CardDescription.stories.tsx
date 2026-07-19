import type { Meta, StoryObj } from "@storybook/react";
import { CardDescription } from "./CardDescription";

const meta: Meta<typeof CardDescription> = {
  title: "Containers/CardDescription",
  component: CardDescription,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    supportingText: { control: "text" },
    showTitle: { control: "boolean" },
    showImage: { control: "boolean" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
  },
  args: {
    title: "森林浴步道",
    supportingText:
      "步道全長1,700 m，步道沿線林相為人工柳杉林與天然闊葉林，極適合林間漫步享受森林的氣息以及觀察自然生態，為本園區最長的步道，請斟酌體能。",
    showTitle: true,
    showImage: true,
  },
};
export default meta;

type Story = StoryObj<typeof CardDescription>;

export const Default: Story = {};

export const WithoutImage: Story = {
  args: { showImage: false },
};

export const WithoutTitle: Story = {
  args: { showTitle: false },
};
