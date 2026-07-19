import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Clickable/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
  },
  args: {
    label: "服務條款",
    href: "#",
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};
