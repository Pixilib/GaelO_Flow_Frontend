import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/RenderComponents/Input';

const meta = {
    title: 'Example/Input',
    component: Input,
    tags: ['autodocs'],
    // what options are available for the component
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['text', 'password'],
            },
        },
        svgRight: {
            control: {
                type: 'select',
                options: ['eye', 'eye-off'],
            },
        },
    },
    } satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {};

export const Default: Story = {
    decorators: [],
    name: 'Default',
    parameters: {},
    args: {
        type: 'text',
        placeholder: 'Enter your username',
        className: 'w-1/2',
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
        svgRight: 'eye',
    },
};