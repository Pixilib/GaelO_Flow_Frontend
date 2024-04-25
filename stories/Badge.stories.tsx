// Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../src/ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'GAELO FLOW UI/Badge',
  component: Badge,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: 'Badge',
    },
    className: {
      control: 'text',
      defaultValue: 'text-m font-medium text-center ring-0 ring-inset outline-0 min-w-4',
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Small: Story = {
  args: {
    value: 'Small',
    className: 'text-xs py-1 px-2',
  },
};

export const Medium: Story = {
  args: {
    value: 'Medium',
    className: 'text-sm py-1.5 px-3',
  },
};

export const RoundedSuccess: Story = {
  args: {
    value: 'rounded Success',
    className: 'text-sm py-1.5 px-3 rounded-full bg-[#CDFFCD] text-success ring-1',
  },
};

export const Large: Story = {
  args: {
    value: 'Large',
    className: 'text-lg py-2 px-4',
  },
};

export const XLarge: Story = {
  args: {
    value: 'XLarge',
    className: 'text-xl py-2.5 px-4.5',
  },
};
export const RoundedXL: Story = {
  args: {
    value: 'rounded XL',
    className: 'text-xl py-2.5 px-4.5 rounded-full',
  },
};
export const BadgesInline: Story = {
  render: () => (
    <div className="flex space-x-4">
 
    </div>
  ),
};
