import type { Meta, StoryObj } from "@storybook/react";
import { LocationPin } from "./LocationPin";

const meta: Meta<typeof LocationPin> = {
  title: "Clickable/LocationPin",
  component: LocationPin,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    state: { control: "radio", options: ["Default", "Focused"] },
    type: { control: "radio", options: ["Default", "Info"] },
  },
  args: {
    label: "內洞國家森林遊樂區",
    state: "Default",
    type: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof LocationPin>;

export const Default: Story = {};

export const Focused: Story = {
  args: { state: "Focused" },
};

export const Info: Story = {
  args: { type: "Info" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, background: "var(--color-gray-50)", padding: 24 }}>
      {(["Default", "Focused"] as const).map((state) =>
        (["Default", "Info"] as const).map((type) => (
          <LocationPin key={`${state}-${type}`} state={state} type={type} />
        ))
      )}
    </div>
  ),
};
