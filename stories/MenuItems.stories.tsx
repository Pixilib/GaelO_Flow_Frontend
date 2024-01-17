import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from '../src/RenderComponents/NavBar/MenuItem';

const meta: Meta<typeof MenuItem> = {
    title: 'Components/MenuItem',
    component: MenuItem,
    tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MenuItem>;

export const MenuItems: Story = {};

export const MenuItemsWithProps: Story = {
    decorators: [],
    name: 'MenuItems',
    parameters: {},
};