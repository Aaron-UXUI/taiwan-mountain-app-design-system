import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Clickable/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    for: { control: "radio", options: ["Location", "Save", "OfflineMap"] },
    state: {
      control: "radio",
      options: ["Default", "Pressing", "Clicked", "Loading", "Downloaded"],
    },
    progress: { control: "number" },
  },
  args: {
    for: "Location",
    state: "Default",
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Location: Story = {};

export const LocationPressing: Story = {
  args: { for: "Location", state: "Pressing" },
};

export const Save: Story = {
  args: { for: "Save", state: "Default" },
};

export const SaveClicked: Story = {
  args: { for: "Save", state: "Clicked" },
};

export const OfflineMapDefault: Story = {
  args: { for: "OfflineMap", state: "Default" },
};

export const OfflineMapLoading: Story = {
  args: { for: "OfflineMap", state: "Loading", progress: 42 },
};

export const OfflineMapDownloaded: Story = {
  args: { for: "OfflineMap", state: "Downloaded" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton for="Location" state="Default" />
      <IconButton for="Location" state="Pressing" />
      <IconButton for="Save" state="Default" />
      <IconButton for="Save" state="Clicked" />
      <IconButton for="OfflineMap" state="Default" />
      <IconButton for="OfflineMap" state="Loading" progress={42} />
      <IconButton for="OfflineMap" state="Downloaded" />
    </div>
  ),
};
