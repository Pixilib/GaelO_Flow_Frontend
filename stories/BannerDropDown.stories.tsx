import type { Meta, Story } from "@storybook/react";
import DropDown from "../src/ui/menu/DropDown";

const meta: Meta<DropDown> = {
    title: "GAELO FLOW UI/DropDown",
    component: DropDown,
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

export const BannerDropDownStory: Story<DropDown> = (args) => (
  <DropDown {...args} />
);