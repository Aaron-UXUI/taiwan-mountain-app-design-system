import type { Meta, StoryObj } from "@storybook/react";
import { OfflineMap } from "./OfflineMap";

const meta: Meta<typeof OfflineMap> = {
  title: "Indicators/OfflineMap",
  component: OfflineMap,
  tags: ["autodocs"],
  argTypes: {
    signalMissing: { control: "radio", options: ["None", "Some", "Most"] },
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

/** `Signal Missing=None` — nothing missing, every area stable. */
export const CollapsedNone: Story = {
  args: { signalMissing: "None" },
};

export const CollapsedMost: Story = {
  args: { signalMissing: "Most" },
};

export const Expanded: Story = {
  args: { expanded: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <OfflineMap signalMissing="None" expanded={false} />
      <OfflineMap signalMissing="Some" expanded={false} />
      <OfflineMap signalMissing="Most" expanded={false} />
      <OfflineMap signalMissing="Some" expanded />
    </div>
  ),
};
