import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControls, type SegmentedControlsSelection } from "./SegmentedControls";

const meta: Meta<typeof SegmentedControls> = {
  title: "Clickable/SegmentedControls",
  component: SegmentedControls,
  tags: ["autodocs"],
  argTypes: {
    leftLabel: { control: "text" },
    rightLabel: { control: "text" },
    selected: { control: "radio", options: ["Left", "Right"] },
  },
  args: {
    leftLabel: "瀏覽數",
    rightLabel: "距離",
    selected: "Left",
  },
};
export default meta;

type Story = StoryObj<typeof SegmentedControls>;

export const Left: Story = {};

export const Right: Story = {
  args: { selected: "Right" },
};

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SegmentedControlsSelection>(args.selected ?? "Left");
    return <SegmentedControls {...args} selected={selected} onSelectedChange={setSelected} />;
  },
};
