import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardNumbers } from "./KeyboardNumbers";

const meta: Meta<typeof KeyboardNumbers> = {
  title: "IosSystem/KeyboardNumbers",
  component: KeyboardNumbers,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof KeyboardNumbers>;

export const Default: Story = {};
