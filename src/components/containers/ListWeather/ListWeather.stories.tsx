import type { Meta, StoryObj } from "@storybook/react";
import { ListWeather } from "./ListWeather";

const meta: Meta<typeof ListWeather> = {
  title: "Containers/ListWeather",
  component: ListWeather,
  tags: ["autodocs"],
  argTypes: {
    date: { control: "text" },
    week: { control: "text" },
    temperature: { control: "text" },
    apparentTemperature: { control: "text" },
    precipitationRate: { control: "text" },
    uv: { control: "text" },
    degreeOfUv: { control: "text" },
    sunrise: { control: "text" },
    sunset: { control: "text" },
    humidity: { control: "text" },
    windSpeed: { control: "text" },
    windDirection: { control: "text" },
  },
  args: {
    date: "08/11",
    week: "星期日",
    temperature: "29 / 33℃",
    apparentTemperature: "29 / 33℃",
    precipitationRate: "90%",
    uv: "5",
    degreeOfUv: "中量級",
    sunrise: "05:48",
    sunset: "17:37",
    humidity: "84%",
    windSpeed: "4",
    windDirection: "東南",
  },
};
export default meta;

type Story = StoryObj<typeof ListWeather>;

export const Default: Story = {};

export const WeeklyForecastRow: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8 }}>
      {["08/11", "08/12", "08/13", "08/14", "08/15"].map((date) => (
        <ListWeather key={date} {...args} date={date} />
      ))}
    </div>
  ),
};
