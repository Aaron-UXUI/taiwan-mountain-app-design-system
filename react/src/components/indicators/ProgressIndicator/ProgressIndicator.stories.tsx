import type { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Indicators/ProgressIndicator",
  component: ProgressIndicator,
  tags: ["autodocs"],
  argTypes: {
    step: { control: "radio", options: ["Choice", "Method", "Info"] },
  },
  args: {
    step: "Choice",
  },
};
export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const Choice: Story = {};

export const Method: Story = {
  args: { step: "Method" },
};

export const Info: Story = {
  args: { step: "Info" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 375 }}>
      <ProgressIndicator step="Choice" />
      <ProgressIndicator step="Method" />
      <ProgressIndicator step="Info" />
    </div>
  ),
};
