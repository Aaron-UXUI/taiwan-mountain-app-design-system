import type { Meta, StoryObj } from "@storybook/react";
import { Logos, type LogosName } from "./Logos";

const ALL_NAMES: LogosName[] = [
  "credit-card",
  "mastercard",
  "jcb",
  "line-pay",
  "google-pay",
  "apple-pay",
  "apple",
  "google",
  "facebook",
  "cht",
  "taiwan-mobile",
  "fet",
];

const meta: Meta<typeof Logos> = {
  title: "Icons/Logos",
  component: Logos,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "credit-card",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Placeholder text/monogram badges for payment and login brand marks. The Figma source shows the real trademarked logos (Visa, Mastercard, Apple, Google, Facebook, telecom carriers) — those are not reproduced here since this project has no license to fabricate real brand marks.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Logos>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Logos name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
