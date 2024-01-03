import type { Meta, StoryObj } from '@storybook/react';
import Input2 from '@/RenderComponents/Input2';

const meta = {
    title : 'Example/Input2',
    component: Input2,
    tags: ['autodocs'],
    } satisfies Meta<typeof Input2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input2Story: Story = {};

export const Default: Story = {
    decorators: [],
    name: 'Default',
    parameters: {},
    args: {
        type: 'text',
        placeholder: 'Enter your username',
        className: '',
        label: 'username',
    },
};

export const Password: Story = {
    decorators: [],
    name: 'Password',
    parameters: {},
    args: {
        type: 'password',
        placeholder: 'Enter your password',
        className: '',
        label: 'password',
    },
};