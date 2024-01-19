import type { Meta, StoryObj } from '@storybook/react';
import Administrator from '../src/assets/administrator_line_icon_236151 1 (1).svg?react';
import {MenuItemCollapse} from '../src/RenderComponents/NavBar/MenuItem';


const meta: Meta<typeof MenuItemCollapse> = {
    title: 'GAELO FLOW UI/MenuItem',
    component: MenuItemCollapse,
    tags: ["autodocs"],
    args: {
        title: 'Menu',
        isOpen: false,
        className: 'bg-primary text-white',
        items: [
                {
                  title: "Lost Password",
                  path: "/lost-password",
                  isActive: location.pathname === 'api/lost-password' 
                },
                {
                  title: "sign-up",
                  path: "/signup",
                  isActive: location.pathname === '/signup'
                },
                {
                  title: "sign-in",
                  path: "/signin",
                  isActive: location.pathname === '/signin'
                },
              ],
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

