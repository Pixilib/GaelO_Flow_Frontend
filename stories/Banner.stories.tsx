import type { Meta, StoryObj } from "@storybook/react";
import type {BannerProps} from "../src/RenderComponents/Banner/Banner";
import {Banner} from "../src/RenderComponents/Banner/Banner";


const meta: Meta<BannerProps> = {
    title: "GAELO FLOW UI/Banner",
    component: Banner,
    args: {
        children: <div className="w-full text-white bg-primary">Hello</div>,
        className: "bg-red", 
    },
    argTypes: {
        children: {
        options: ["Text"],
        control: { type: "radio" },
        },
    },
    tags:["autodocs"]
    };


export default meta;
type Story = StoryObj<BannerProps>;

export const BannerStory: Story = {


};
