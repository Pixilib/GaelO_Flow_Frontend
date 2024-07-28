import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckBox from '../src/ui/Checkbox';

const meta = {
    title: "GAELO FLOW UI/CheckBox",
    component: CheckBox,
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        onChange: { action: 'changed' },
        bordered: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        label: 'Default checkbox',
        checked: false,
    },
} satisfies Story;

export const Checked = {
    args: {
        label: 'Checked checkbox',
        checked: true,
    },
} satisfies Story;

export const withoutBordered = {
    args: {
        label: 'Checkbox without border',
        checked: false,
        bordered: false,
    },
} satisfies Story;
export const WithoutLabel = {
    args: {
        checked: false,
    },
} satisfies Story;

export const WithState = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked);
        return <CheckBox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
    },
    args: {
        label: 'Checkbox with state',
        checked: false,
    },
} satisfies Story;