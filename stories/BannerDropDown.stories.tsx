import type { Meta, Story } from "@storybook/react";
import type {BannerDropDownProps} from "../src/RenderComponents/Menu/BannerDropDown";
import {BannerDropDown} from "../src/RenderComponents/Menu/BannerDropDown";

const meta: Meta<BannerDropDownProps> = {
    title: "GAELO FLOW UI/BannerDropDown",
    component: BannerDropDown,
    args: {
        children: "Text",
    },
    argTypes: {
        children: {
        options: ["Text"],
        },
    },
    tags:["autodocs"]
};

export default meta;

export const BannerDropDownStory: Story<BannerDropDownProps> = (args) => (
  <BannerDropDown {...args} />
);