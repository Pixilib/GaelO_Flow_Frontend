import type { Meta, StoryObj } from '@storybook/react';
import Input2 from '@/RenderComponents/Input2';
import { Variant } from '@/RenderComponents/enum';
import User  from '../assets/user?.svg'

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

export const VariantDark: Story = {
    decorators: [],
    name: 'VariantDark',
    parameters: {
        backgrounds: {
            default: 'gray',
            values: [
                { name: 'gray', value: '#f3f4f6' },
            ],
        },

    },
    args: {
        type: 'text',
        placeholder: 'Enter your username',
        className: '',
        label: 'username',
        variant: Variant.Dark,
    },
};

export const VariantSvg: Story = {
    decorators: [],
    name: 'VariantSvg',
    parameters: {},
    args: {
        type: 'text',
        placeholder: 'Enter your username',
        className: '',
        label: 'username',
        variant: Variant.Dark,
        svgLeft: <User/>,
    },
};