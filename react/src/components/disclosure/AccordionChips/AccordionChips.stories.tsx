import type { Meta, StoryObj } from "@storybook/react";
import { AccordionChips } from "./AccordionChips";

const meta: Meta<typeof AccordionChips> = {
  title: "Disclosure/AccordionChips",
  component: AccordionChips,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    expanded: { control: "boolean" },
    selected: { control: "boolean" },
    selectedCount: { control: "text" },
  },
  args: {
    title: "景點主題",
    expanded: false,
    selected: false,
    selectedCount: "0",
  },
};
export default meta;

type Story = StoryObj<typeof AccordionChips>;

export const CollapsedUnselected: Story = {
  args: { expanded: false, selected: false },
};

export const ExpandedUnselected: Story = {
  args: { expanded: true, selected: false },
};

export const CollapsedSelected: Story = {
  args: { expanded: false, selected: true, selectedCount: "3" },
};

export const ExpandedSelected: Story = {
  args: { expanded: true, selected: true, selectedCount: "3" },
};
