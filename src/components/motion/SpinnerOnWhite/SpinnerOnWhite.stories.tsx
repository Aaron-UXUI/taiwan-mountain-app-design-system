import type { Meta, StoryObj } from "@storybook/react";
import { SpinnerOnWhite } from "./SpinnerOnWhite";

const meta: Meta<typeof SpinnerOnWhite> = {
  title: "Motion/SpinnerOnWhite",
  component: SpinnerOnWhite,
  parameters: {
    backgrounds: { default: "light" },
  },
};
export default meta;

type Story = StoryObj<typeof SpinnerOnWhite>;

export const Default: Story = {};
