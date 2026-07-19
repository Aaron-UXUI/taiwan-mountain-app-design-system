import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";

const meta: Meta<typeof Tab> = {
  title: "Disclosure/Tab",
  component: Tab,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
    size: { control: "radio", options: ["Small", "Medium", "Large"] },
    showBadge: { control: "boolean" },
    badgeCount: { control: "text" },
  },
  args: {
    label: "標題",
    active: true,
    size: "Small",
    showBadge: false,
    badgeCount: "3",
  },
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["Small", "Medium", "Large"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 0 }}>
          <Tab label="標題" size={size} active />
          <Tab label="標題" size={size} active={false} />
          {size === "Medium" && <Tab label="標題" size={size} active={false} showBadge />}
        </div>
      ))}
    </div>
  ),
};
