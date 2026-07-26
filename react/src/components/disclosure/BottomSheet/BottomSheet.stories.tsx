import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet } from "./BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Disclosure/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: "radio",
      options: ["Filter_Discover", "Map_Info", "Filter_MapSearch"],
    },
  },
  args: {
    style: "Filter_Discover",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};
export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const FilterDiscover: Story = {
  args: { style: "Filter_Discover" },
};

export const MapInfo: Story = {
  args: { style: "Map_Info" },
};

export const FilterMapSearch: Story = {
  args: { style: "Filter_MapSearch" },
};
