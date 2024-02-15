import type { Meta, StoryObj } from '@storybook/react';
import SideBarItems from '../src/SideBarItems';

const meta: Meta<typeof SideBarItems> = {
    title: 'GAELO FLOW UI/SideBarItems',
    component: SideBarItems,
    args: {
        elements: [
            { title: "Home", path: "/home", isActive: true },
            { title: "About", path: "/about", isActive: false },
            { title: "Contact", path: "/contact", isActive: false },
        ],
    },
    argTypes: {
        elements: {
            control: { type: "array" },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SideBarItems>;

export const SideBarItemsStory: Story = {};