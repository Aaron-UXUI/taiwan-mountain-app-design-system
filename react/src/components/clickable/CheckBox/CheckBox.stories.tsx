import type { Meta, StoryObj } from "@storybook/react";
import { CheckBox } from "./CheckBox";

const meta: Meta<typeof CheckBox> = {
  title: "Clickable/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "國家森林遊樂區",
    id: "checkbox-default",
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Off: Story = {
  args: { defaultChecked: false },
};

export const On: Story = {
  args: { id: "checkbox-on", defaultChecked: true },
};

export const Disabled: Story = {
  args: { id: "checkbox-disabled", disabled: true },
};
