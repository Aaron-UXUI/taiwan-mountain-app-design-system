import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CollapseText } from "./CollapseText";

const meta: Meta<typeof CollapseText> = {
  title: "Disclosure/CollapseText",
  component: CollapseText,
  tags: ["autodocs"],
  argTypes: {
    expanded: { control: "boolean" },
    text: { control: "text" },
  },
  args: {
    expanded: false,
  },
};
export default meta;

type Story = StoryObj<typeof CollapseText>;

export const Collapsed: Story = {
  args: { expanded: false },
};

export const Expanded: Story = {
  args: { expanded: true },
};

export const Interactive: Story = {
  render: (args) => {
    function Wrapper() {
      const [expanded, setExpanded] = useState(false);
      return <CollapseText {...args} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />;
    }
    return <Wrapper />;
  },
};
