import type { Meta, StoryObj } from "@storybook/react";
import { IconWeather, type IconWeatherName } from "./IconWeather";

const ALL_NAMES: IconWeatherName[] = ["cloud-sun", "sunny", "rain", "lightning-rain", "windy", "typhoon", "cloud-snow"];

const meta: Meta<typeof IconWeather> = {
  title: "Icons/IconWeather",
  component: IconWeather,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
  },
  args: {
    name: "cloud-sun",
  },
};
export default meta;

type Story = StoryObj<typeof IconWeather>;

export const Default: Story = {};

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 16, fontFamily: "var(--typeface-pingfang-tc)" }}>
      {ALL_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8 }}>
          <IconWeather name={name} />
          <span style={{ fontSize: 11, color: "var(--color-gray-800)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
