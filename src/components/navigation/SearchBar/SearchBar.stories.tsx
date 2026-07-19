import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Navigation/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    state: { control: "radio", options: ["Default", "Focused", "Typing", "Typed"] },
  },
  args: {
    placeholder: "搜尋",
    state: "Default",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 327 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const Focused: Story = {
  args: { state: "Focused" },
};

export const Typing: Story = {
  args: { state: "Typing" },
};

export const Typed: Story = {
  args: { state: "Typed" },
};
