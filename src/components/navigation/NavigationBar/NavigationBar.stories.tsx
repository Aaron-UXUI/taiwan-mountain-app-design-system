import type { Meta, StoryObj } from "@storybook/react";
import { NavigationBar } from "./NavigationBar";

const meta: Meta<typeof NavigationBar> = {
  title: "Navigation/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "radio", options: ["activity", "map", "notify", "member"] },
  },
  args: {
    state: "activity",
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

type Story = StoryObj<typeof NavigationBar>;

export const Activity: Story = {};

export const Map: Story = {
  args: { state: "map" },
};

export const Notify: Story = {
  args: { state: "notify" },
};

export const Member: Story = {
  args: { state: "member" },
};
