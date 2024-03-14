import type { Meta, StoryObj } from "@storybook/react";
import DropDown from "../src/ui/menu/DropDown";

const meta: Meta<typeof DropDown> = {
    title: "GAELO FLOW UI/DropDown",
    component: DropDown,
    tags: ["autodocs"],
    argTypes: {
        
        chevronPosition: { control: { type: 'radio', options: ['left', 'right'] } },
        children: {
            control: 'text'
        },
        className: {
            control: 'text'
        },
        isOpen: {
            control: 'boolean'
        },
        dropDownOpen: {
            action: "clicked",
        },
        dropDown: {
            control:"object"
        },
    },
}

export default meta;

type Story = StoryObj<typeof DropDown>;

export const DropDownStory: Story = {
    args: {
        chevronPosition: "right",
        children: "DropDown",
        className: "w-44 blue-gray-500 flex justify-center relative",
        isOpen: false,
        dropDownOpen: () => { },
        dropDown: <div className="absolute top-full text-dark">BannerItems</div>,

}
}

export const DropDownStoryLeft: Story = {
    args: {
        chevronPosition: "left",
        children: "DropDown",
        className: "w-44 blue-gray-300 flex justify-center relative",
        isOpen: false,
        dropDownOpen: () => { },
        dropDown: <div className="absolute top-full text-dark">BannerItems</div>,
}
}
