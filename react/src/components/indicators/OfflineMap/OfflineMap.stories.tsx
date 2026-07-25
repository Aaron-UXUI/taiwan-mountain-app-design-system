import type { Meta, StoryObj } from "@storybook/react";
import { OfflineMap } from "./OfflineMap";

const meta: Meta<typeof OfflineMap> = {
  title: "Indicators/OfflineMap",
  component: OfflineMap,
  tags: ["autodocs"],
  argTypes: {
    signalMissing: { control: "radio", options: ["Some", "Most"] },
    expanded: { control: "boolean" },
  },
  args: {
    signalMissing: "Some",
    expanded: false,
  },
};
export default meta;

type Story = StoryObj<typeof OfflineMap>;

export const CollapsedSome: Story = {};

export const CollapsedMost: Story = {
  args: { signalMissing: "Most" },
};

export const Expanded: Story = {
  args: { expanded: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <OfflineMap signalMissing="Some" expanded={false} />
      <OfflineMap signalMissing="Most" expanded={false} />
      <OfflineMap expanded />
    </div>
  ),
};
