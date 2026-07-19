import type { Meta, StoryObj } from "@storybook/react";
import { Crowdedness } from "./Crowdedness";

const meta: Meta<typeof Crowdedness> = {
  title: "Indicators/Crowdedness",
  component: Crowdedness,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "radio", options: ["Comfortable", "Partial Crowded", "Crowded"] },
    label: { control: "text" },
  },
  args: {
    state: "Comfortable",
    label: "即時人潮狀況",
  },
};
export default meta;

type Story = StoryObj<typeof Crowdedness>;

export const Comfortable: Story = {};

export const PartialCrowded: Story = {
  args: { state: "Partial Crowded" },
};

export const Crowded: Story = {
  args: { state: "Crowded" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Crowdedness state="Comfortable" />
      <Crowdedness state="Partial Crowded" />
      <Crowdedness state="Crowded" />
    </div>
  ),
};
