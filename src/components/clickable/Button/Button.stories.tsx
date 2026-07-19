import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Clickable/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["Primary", "Secondary", "Tertiary"] },
    size: { control: "radio", options: ["Large", "Small"] },
    state: { control: "radio", options: ["Default", "Disabled", "Pressing", "Loading"] },
    label: { control: "text" },
  },
  args: {
    label: "按鈕",
    type: "Primary",
    size: "Large",
    state: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["Primary", "Secondary", "Tertiary"] as const).map((type) => (
        <div key={type} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["Large", "Small"] as const).map((size) =>
            (["Default", "Pressing", "Disabled", "Loading"] as const).map((state) => (
              <Button key={`${type}-${size}-${state}`} type={type} size={size} state={state} label={`${type}/${size}`} />
            ))
          )}
        </div>
      ))}
    </div>
  ),
};
