import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Indicators/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    attribute: { control: "radio", options: ["Small", "Large", "Maximum"] },
    for: { control: "radio", options: ["Accordion", "Notification"] },
    count: { control: "text" },
  },
  args: {
    attribute: "Small",
    for: "Accordion",
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const SmallAccordion: Story = {};

export const SmallNotification: Story = {
  args: { attribute: "Small", for: "Notification" },
};

export const LargeNotification: Story = {
  args: { attribute: "Large", for: "Notification", count: "3" },
};

export const MaximumNotification: Story = {
  args: { attribute: "Maximum", for: "Notification" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Badge attribute="Small" for="Accordion" />
      <Badge attribute="Small" for="Notification" />
      <Badge attribute="Large" for="Notification" count="3" />
      <Badge attribute="Maximum" for="Notification" />
    </div>
  ),
};
