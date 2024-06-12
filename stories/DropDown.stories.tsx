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
            control: "object"
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
export const DropDownStoryList: Story = {
    args: {
        chevronPosition: "right",
        children: "DropDown with list",
        className: "w-44 blue-gray-500 flex justify-center relative shadow-md",
        isOpen: false,
        dropDownOpen: () => { },
        dropDown: (
            <div className="absolute p-2 bg-white rounded-md shadow-md top-full text-dark">
                <ul>
                    <li>
                        <input type="checkbox" id="option1" />
                        <label htmlFor="option1">Option 1</label>
                    </li>
                    <li>
                        <input type="checkbox" id="option2" />
                        <label htmlFor="option2">Option 2</label>
                    </li>
                    <li>
                        <input type="checkbox" id="option3" />
                        <label htmlFor="option3">Option 3</label>
                    </li>
                </ul>
            </div>
        ),
    },
};

