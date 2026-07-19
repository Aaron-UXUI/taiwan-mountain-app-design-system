import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Clickable/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    radioStyle: { control: "radio", options: ["Default", "Expanded"] },
    inputPlaceholder: { control: "text" },
  },
  args: {
    label: "個人",
    id: "radio-default",
    checked: false,
    radioStyle: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { id: "radio-checked", checked: true },
};

export const Expanded: Story = {
  args: {
    id: "radio-expanded",
    checked: true,
    radioStyle: "Expanded",
    inputPlaceholder: "輸入內容",
  },
};
