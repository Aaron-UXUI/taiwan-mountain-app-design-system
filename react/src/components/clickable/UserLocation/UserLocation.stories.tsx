import type { Meta, StoryObj } from "@storybook/react";
import { UserLocation } from "./UserLocation";

const meta: Meta<typeof UserLocation> = {
  title: "Clickable/UserLocation",
  component: UserLocation,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof UserLocation>;

export const Default: Story = {
  render: () => (
    <div style={{ background: "var(--color-gray-50)", padding: 24 }}>
      <UserLocation />
    </div>
  ),
};
