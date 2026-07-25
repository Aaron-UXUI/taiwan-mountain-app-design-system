import type { Meta, StoryObj } from "@storybook/react";
import { CardScene } from "./CardScene";

const meta: Meta<typeof CardScene> = {
  title: "Containers/CardScene",
  component: CardScene,
  tags: ["autodocs"],
  argTypes: {
    siteName: { control: "text" },
    location: { control: "text" },
    distance: { control: "text" },
    showDistance: { control: "boolean" },
    showFamilyFriendlyLabel: { control: "boolean" },
    statusLabel: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    saved: { control: "boolean" },
    onToggleSave: { action: "toggle-save" },
  },
  args: {
    siteName: "景點名稱",
    location: "台北市內湖區",
    distance: "1.2km",
    showDistance: false,
    showFamilyFriendlyLabel: false,
    statusLabel: "今日開放",
    saved: false,
  },
};
export default meta;

type Story = StoryObj<typeof CardScene>;

export const Default: Story = {};

export const WithDistanceAndFamilyLabel: Story = {
  args: {
    showDistance: true,
    showFamilyFriendlyLabel: true,
  },
};

export const Saved: Story = {
  args: { saved: true },
};
