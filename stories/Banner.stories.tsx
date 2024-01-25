import type { Meta, StoryObj } from "@storybook/react";
import type {BannerProps} from "../src/RenderComponents/Banner/Banner";
import {Banner} from "../src/RenderComponents/Banner/Banner";


const meta: Meta<BannerProps> = {
    title: "Gaelo Flow UI/Banner",
    component: Banner,
    args: {
        children: "Text",
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

export const BannerStory: Story = {};