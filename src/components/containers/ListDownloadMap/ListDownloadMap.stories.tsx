import type { Meta, StoryObj } from "@storybook/react";
import { ListDownloadMap } from "./ListDownloadMap";

const meta: Meta<typeof ListDownloadMap> = {
  title: "Containers/ListDownloadMap",
  component: ListDownloadMap,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    showDownloadButton: { control: "boolean" },
    onDownload: { action: "download" },
  },
  args: {
    label: "滿月圓國家森林遊樂區",
    showDownloadButton: true,
  },
};
export default meta;

type Story = StoryObj<typeof ListDownloadMap>;

export const Default: Story = {};

export const WithoutDownloadButton: Story = {
  args: { showDownloadButton: false },
};
