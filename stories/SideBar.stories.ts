//Exemple de story:
import { withRouter } from 'storybook-addon-react-router-v6';
import type { Meta, StoryObj } from "@storybook/react";
import SideBar from "../src/root/SideBar";

const meta: Meta<typeof SideBar> = {
  title: "GAELO FLOW UI/Root/SideBar",
  component: SideBar,
  tags: ["autodocs"],
  decorators: [withRouter],
};
export default meta;
type Story = StoryObj<typeof SideBar>;

export const SideBarStory: Story = {};
export const Simple: Story = {
  decorators: [],
  name: "So simple!",
  parameters: {},
};
