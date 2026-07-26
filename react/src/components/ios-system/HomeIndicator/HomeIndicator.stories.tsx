import type { Meta, StoryObj } from "@storybook/react";
import { HomeIndicator } from "./HomeIndicator";

const meta: Meta<typeof HomeIndicator> = {
  title: "IosSystem/HomeIndicator",
  component: HomeIndicator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 375, background: "var(--color-gray-white)" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HomeIndicator>;

export const Default: Story = {};
