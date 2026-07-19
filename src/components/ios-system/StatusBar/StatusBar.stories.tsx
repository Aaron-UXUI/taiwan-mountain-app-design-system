import type { Meta, StoryObj } from "@storybook/react";
import { StatusBar } from "./StatusBar";

const meta: Meta<typeof StatusBar> = {
  title: "IosSystem/StatusBar",
  component: StatusBar,
  tags: ["autodocs"],
  argTypes: {
    time: { control: "text" },
  },
  args: {
    time: "10:08",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof StatusBar>;

export const Default: Story = {};
