import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from '../src/RenderComponents/NavBar/MenuItem';
import Administrator from '../src/assets/administrator_line_icon_236151 1 (1).svg?react';
import MenuItemCollapse from '../src/RenderComponents/NavBar/MenuItem';


const meta: Meta<typeof MenuItemCollapse> = {
    title: 'GAELO FLOW UI/MenuItem',
    component: MenuItem,
    tags: ["autodocs"],
    args: {
        title: 'Menu',
        isOpen: false,
        className: 'bg-primary text-white',
        items: ['item1', 'item2', 'item3'],
        icon: <Administrator />,
    },
    argTypes: {
        title: {
            control: { type: 'text' },
        },
        isOpen: {
            control: { type: 'boolean' },
        },
    },
};
export default meta;
type Story = StoryObj<typeof MenuItemCollapse>;

export const MenuItems: Story = {};

export const MenuItemsWithProps: Story = {
    decorators: [],
    name: 'MenuItems',
    parameters: {},
};

