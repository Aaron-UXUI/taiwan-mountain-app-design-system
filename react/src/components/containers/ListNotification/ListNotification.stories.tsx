import type { Meta, StoryObj } from "@storybook/react";
import { ListNotification } from "./ListNotification";

const meta: Meta<typeof ListNotification> = {
  title: "Containers/ListNotification",
  component: ListNotification,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "滿月圓國家森林遊樂區",
    id: "list-notification-default",
  },
};
export default meta;

type Story = StoryObj<typeof ListNotification>;

export const Off: Story = {
  args: { defaultChecked: false },
};

export const On: Story = {
  args: { id: "list-notification-on", defaultChecked: true },
};

export const Disabled: Story = {
  args: { id: "list-notification-disabled", disabled: true },
};
