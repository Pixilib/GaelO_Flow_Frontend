import type { Meta, Story } from "@storybook/react";
import { BrowserRouter as Router } from 'react-router-dom';
import type {BannerProps} from "../src/RenderComponents/Banner/Banner";
import {Banner} from "../src/RenderComponents/Banner/Banner";

const meta: Meta<BannerProps> = {
    title: "GAELO FLOW UI/Banner",
    component: Banner,
    args: {
    },
    argTypes: {
        children: {
        options: ["Text"],
        },
    },
    tags:["autodocs"]
};

export default meta;

export const BannerStory: Story<BannerProps> = (args) => (
  <Router>
    <Banner {...args} />
  </Router>
);

BannerStory.args = {
  title: 'Home',
  className: "bg-red",
};
