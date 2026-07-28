import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Clickable/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["Primary", "Secondary", "Tertiary"] },
    size: { control: "radio", options: ["Large", "Small"] },
    state: { control: "radio", options: ["Default", "Disabled", "Pressing", "Loading"] },
    label: { control: "text" },
  },
  args: {
    label: "按鈕",
    type: "Primary",
    size: "Large",
    state: "Default",
  },
};
/**
 * The 19 combinations Figma actually defines. Small has no Loading state at
 * any emphasis, and Tertiary/Small exists only as Default — the remaining 5
 * of the 24 are unused in the product and deliberately not shown.
 */
const FIGMA_MATRIX = [
  { size: "Large", type: "Primary", states: ["Default", "Pressing", "Disabled", "Loading"] },
  { size: "Large", type: "Secondary", states: ["Default", "Pressing", "Disabled", "Loading"] },
  { size: "Large", type: "Tertiary", states: ["Default", "Pressing", "Disabled", "Loading"] },
  { size: "Small", type: "Primary", states: ["Default", "Pressing", "Disabled"] },
  { size: "Small", type: "Secondary", states: ["Default", "Pressing", "Disabled"] },
  { size: "Small", type: "Tertiary", states: ["Default"] },
] as const;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {FIGMA_MATRIX.map(({ size, type, states }) => (
        <div key={`${size}-${type}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {states.map((state) => (
            <Button
              key={`${type}-${size}-${state}`}
              label={`${type}/${size}`}
              // FIGMA_MATRIX above *is* Figma's 19-combination set, so every
              // row here is valid — but TypeScript cannot correlate size/type/
              // state across a mapped heterogeneous union, so it widens them.
              {...({ type, size, state } as ButtonProps)}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
