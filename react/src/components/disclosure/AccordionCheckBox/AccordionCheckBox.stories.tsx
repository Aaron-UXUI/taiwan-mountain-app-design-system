import type { Meta, StoryObj } from "@storybook/react";
import { AccordionCheckBox } from "./AccordionCheckBox";

const meta: Meta<typeof AccordionCheckBox> = {
  title: "Disclosure/AccordionCheckBox",
  component: AccordionCheckBox,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    expanded: { control: "boolean" },
    selected: { control: "boolean" },
    selectedCount: { control: "text" },
  },
  args: {
    title: "景點類型",
    expanded: false,
    selected: false,
    selectedCount: "0",
  },
};
export default meta;

type Story = StoryObj<typeof AccordionCheckBox>;

export const CollapsedUnselected: Story = {
  args: { expanded: false, selected: false },
};

export const ExpandedUnselected: Story = {
  args: { expanded: true, selected: false },
};

export const CollapsedSelected: Story = {
  args: { expanded: false, selected: true, selectedCount: "2" },
};

export const ExpandedSelected: Story = {
  args: { expanded: true, selected: true, selectedCount: "2", checkedOptions: ["國家森林遊樂區", "自然步道"] },
};
