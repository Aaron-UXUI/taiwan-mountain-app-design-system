import type { Meta, StoryObj } from "@storybook/react";
import { MotionTransaction } from "./MotionTransaction";

const meta: Meta<typeof MotionTransaction> = {
  title: "Motion/MotionTransaction",
  component: MotionTransaction,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "light" },
  },
};
export default meta;

type Story = StoryObj<typeof MotionTransaction>;

export const Default: Story = {};
