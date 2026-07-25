import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Clickable/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    state: { control: "radio", options: ["Default", "Typing", "Typed", "Error"] },
    size: { control: "radio", options: ["S", "M", "L", "XL"] },
    errorMsg: { control: "text" },
    showIcon: { control: "boolean" },
  },
  args: {
    label: "卡片背面3碼（CVV）",
    placeholder: "Text",
    state: "Default",
    size: "M",
    errorMsg: "請完整輸入3碼數字",
    showIcon: false,
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = { args: { id: "tf-default" } };

export const Typing: Story = { args: { id: "tf-typing", state: "Typing" } };

export const Typed: Story = { args: { id: "tf-typed", state: "Typed" } };

export const ErrorState: Story = {
  args: { id: "tf-error", state: "Error", showIcon: false },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["Default", "Typing", "Typed", "Error"] as const).map((state) => (
        <TextField key={state} id={`tf-all-${state}`} state={state} />
      ))}
    </div>
  ),
};
