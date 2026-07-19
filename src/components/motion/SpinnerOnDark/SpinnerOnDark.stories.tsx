import type { Meta, StoryObj } from "@storybook/react";
import { SpinnerOnDark } from "./SpinnerOnDark";

const meta: Meta<typeof SpinnerOnDark> = {
  title: "Motion/SpinnerOnDark",
  component: SpinnerOnDark,
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-primary-green-800)", padding: 16, display: "inline-block" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SpinnerOnDark>;

export const Default: Story = {};
