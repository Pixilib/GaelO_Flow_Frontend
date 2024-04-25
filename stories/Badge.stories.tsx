import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'GAELO FLOW UI/Badge',
  component: Badge,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: 'Badge',
    },
    backgroundColor: {
      control: 'color',
      defaultValue: '#E0E7FF',
    },
    textColor: {
      control: 'color',
      defaultValue: '#3730A3',
    },
    borderColor: {
      control: 'color',
      defaultValue: '#C7D2FE',
    },
    className: {
      control: 'text',
      defaultValue: 'text-sm py-1.5 px-3',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Displays a label badge typically used for indicating status or categorizing items.',
      },
    },
    tags: ['autodocs'],
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    value: 'Default',
  },
};

export const BadgeSuccess: Story = {
  args: {
    value: 'Rounded Success',
    backgroundColor: '#CDFFCD',
    textColor: '#276749',
    borderColor: '#A3E635',
    className: 'rounded-full',
  },
};

export const BadgeDanger: Story = {
  args: {
    value: 'Rounded Danger',
    backgroundColor: '#FEE2E2',
    textColor: '#B91C1C',
    borderColor: '#FECACA',
    className: 'rounded-full',
  },
};

export const BadgesInline: Story = {
  render: ({ args }) => (
    <div className="flex space-x-4">
 
    </div>
  ),
  args: {
    className: 'text-sm py-1.5 px-3 rounded-lg',
  },
};
