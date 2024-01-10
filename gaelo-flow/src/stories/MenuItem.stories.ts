import { StoryObj, Meta } from '@storybook/react';
import { MenuItem } from './../RenderComponents/NavBar/MenuItem';


const meta: Meta<typeof MenuItem> = {
    title: 'Components/MenuItem',
    component: MenuItem,
    tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const Simple: Story = {
    decorators: [],
    name: 'So simple!',
    parameters: {},
    args: {
        text: 'Hello',
        className: 'bg-red-500',
    },

};