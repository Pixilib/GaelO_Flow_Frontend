import type { Meta, StoryObj } from '@storybook/react';
import Administrator from '../src/assets/administrator.svg?react';
import MenuItemsCollapse from '../src/RenderComponents/NavBar/MenuItemsCollapse';


const meta: Meta<typeof MenuItemsCollapse> = {
    title: 'GAELO FLOW UI/MenuItem',
    component: MenuItemsCollapse,
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
type Story = StoryObj<typeof MenuItemsCollapse>;

export const MenuItems: Story = {};

export const MenuItemsWithProps: Story = {
    decorators: [],
    name: 'MenuItems',
    parameters: {},
};

