import type { Meta, StoryObj } from "@storybook/react";
import { CarouselIndicators } from "./CarouselIndicators";

const meta: Meta<typeof CarouselIndicators> = {
  title: "Indicators/CarouselIndicators",
  component: CarouselIndicators,
  tags: ["autodocs"],
  argTypes: {
    background: { control: "radio", options: ["White", "Dark"] },
    dotCount: { control: "number" },
    activeIndex: { control: "number" },
  },
  args: {
    background: "White",
    dotCount: 3,
    activeIndex: 0,
  },
};
export default meta;

type Story = StoryObj<typeof CarouselIndicators>;

export const White: Story = {};

export const Dark: Story = {
  args: { background: "Dark" },
  render: (args) => (
    <div style={{ background: "#1D1F1B", padding: 12, display: "inline-block" }}>
      <CarouselIndicators {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <CarouselIndicators background="White" />
      <div style={{ background: "#1D1F1B", padding: 12, display: "inline-block" }}>
        <CarouselIndicators background="Dark" />
      </div>
    </div>
  ),
};
