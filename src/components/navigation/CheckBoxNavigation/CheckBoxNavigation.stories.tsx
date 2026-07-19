import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxNavigation } from "./CheckBoxNavigation";

const meta: Meta<typeof CheckBoxNavigation> = {
  title: "Navigation/CheckBoxNavigation",
  component: CheckBoxNavigation,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
    badge: { control: "radio", options: ["none", "dot", "count"] },
    badgeCount: { control: "text" },
  },
  args: {
    label: "探索",
    active: false,
    badge: "none",
    badgeCount: "3",
  },
};
export default meta;

type Story = StoryObj<typeof CheckBoxNavigation>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const WithCountBadge: Story = {
  args: { badge: "count" },
};

export const WithDotBadge: Story = {
  args: { badge: "dot" },
};
