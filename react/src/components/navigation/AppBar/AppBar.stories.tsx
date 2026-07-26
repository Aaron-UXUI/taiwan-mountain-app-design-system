import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "./AppBar";

const meta: Meta<typeof AppBar> = {
  title: "Navigation/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["nav", "ProfileInfo"] },
    title: { control: "text" },
    showBack: { control: "boolean" },
    showButtonSetting: { control: "boolean" },
    showTitle: { control: "boolean" },
    name: { control: "text" },
    avatarSrc: { control: "text" },
  },
  args: {
    type: "nav",
    title: "標題",
    showBack: true,
    showButtonSetting: false,
    showTitle: true,
    name: "Elaine Lin",
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

type Story = StoryObj<typeof AppBar>;

export const Nav: Story = {};

export const NavWithSetting: Story = {
  args: { showButtonSetting: true },
};

export const ProfileInfo: Story = {
  args: { type: "ProfileInfo" },
};
