import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../src/ui';

const meta = {
  title: 'GAELO FLOW UI/Label',
  component: Label,
  argTypes: {
    value: {
      control: 'text',
      description: 'The text content of the label',
    },
    align: {
      control: { type: 'select', options: ['left', 'right', 'center'] },
      description: 'Text alignment within the label',
      defaultValue: 'left',
    },
    classParent: {
      control: 'text',
      description: 'Custom class for the parent div element',
    },
    className: {
      control: 'text',
      description: 'Custom class for the label element itself',
    }
  },
  tags:['autodocs','atoms']
} satisfies Meta<typeof Label>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    value: 'Default Label',
  }
};

export const CenterAligned: Story = {
  args: {
    ...Default.args,
    align: 'center',
  }
};

export const CustomStyles: Story = {
  args: {
    ...Default.args,
    align: 'right',
    classParent: 'bg-gray-200 p-2 rounded',
    className: 'text-blue-500',
  }
};
