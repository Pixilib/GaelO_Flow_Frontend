import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from 'react-router-dom';
import type BannerProps from "../src/ui/menu/Banner";
import Banner  from "../src/ui/menu/Banner";

const meta: Meta<typeof BannerProps> = {
  title: "GAELO FLOW UI/Banner",
  component: Banner,
  args: {
  },
  argTypes: {
    children: {
      options: ["Text"],
    },
  },
  tags: ["autodocs"]
};

export default meta;

export const BannerStory: StoryObj<typeof BannerProps> = (args) => (
  <Router>
    <Banner {...args} />
  </Router>
);

BannerStory.args = {
  title: 'Home',
  className: "bg-red",
};
