import type { Meta, StoryObj } from "@storybook/react";
import DropDown from "../src/ui/menu/DropDown";

const meta: Meta<typeof DropDown> = {
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
}

export default meta;

type Story = StoryObj<typeof DropDown>;

export const DropDownStory: Story = {


    render: ({ children }) => (
        <div className="space-y-5">
            <DropDown isOpen={false} dropDownOpen={() => console.log('click')} dropDown={<div>Drop Down</div>}>
                {children}
            </DropDown>
        </div>
    )
};