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
      options: ["Default", "Pressing", "Enabled", "Clicked", "Loading", "Downloaded"],
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

/** `State=Enabled` — actively locating; the GPS glyph is filled. */
export const LocationEnabled: Story = {
  args: { for: "Location", state: "Enabled" },
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
      <IconButton for="Location" state="Enabled" />
      <IconButton for="Save" state="Default" />
      {/* Clicked is white in Figma — it sits over a photo, so it needs a
          dark backing to be visible in isolation here. */}
      <span style={{ background: "var(--color-gray-800)", borderRadius: 8, display: "inline-flex" }}>
        <IconButton for="Save" state="Clicked" />
      </span>
      <IconButton for="OfflineMap" state="Default" />
      <IconButton for="OfflineMap" state="Loading" progress={42} />
      <IconButton for="OfflineMap" state="Downloaded" />
    </div>
  ),
};
