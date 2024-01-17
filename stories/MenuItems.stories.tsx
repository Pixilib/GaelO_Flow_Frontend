import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from '../src/RenderComponents/NavBar/MenuItem';
import Administrator from '../public/administrator_line_icon_236151 1 (1).svg?react';


const meta: Meta<typeof MenuItem> = {
    title: 'GAELO FLOW UI/MenuItem',
    component: MenuItem,
    tags: ["autodocs"],
    args: {
        title: 'Menu',
        isOpen: false,
        className: 'bg-primary text-white',
        icon: <Administrator />,
    },
    argTypes: {
    },
};
export default meta;
type Story = StoryObj<typeof MenuItem>;

export const MenuItems: Story = {};

export const MenuItemsWithProps: Story = {
    decorators: [],
    name: 'MenuItems',
    parameters: {},
};

