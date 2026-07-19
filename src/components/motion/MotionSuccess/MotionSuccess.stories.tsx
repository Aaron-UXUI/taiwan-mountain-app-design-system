import type { Meta, StoryObj } from "@storybook/react";
import { MotionSuccess } from "./MotionSuccess";

const meta: Meta<typeof MotionSuccess> = {
  title: "Motion/MotionSuccess",
  component: MotionSuccess,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "light" },
  },
};
export default meta;

type Story = StoryObj<typeof MotionSuccess>;

export const Default: Story = {};
