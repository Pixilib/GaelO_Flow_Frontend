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
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Small: Story = {
  args: {
    value: 'Small',
    className: 'text-xs py-1 px-2', // Petite taille
  },
};

export const Medium: Story = {
  args: {
    value: 'Medium',
    className: 'text-sm py-1.5 px-3', // Taille moyenne
  },
};

export const Large: Story = {
  args: {
    value: 'Large',
    className: 'text-lg py-2 px-4', // Grande taille
  },
};

export const XLarge: Story = {
  args: {
    value: 'XLarge',
    className: 'text-xl py-2.5 px-4.5', // Très grande taille
  },
};
export const RoundedXL: Story = {
    args: {
        value: 'rounded XL',
        className: 'text-xl py-2.5 px-4.5 rounded-full', // Très grande taille
    },
    };
export const BadgesInline: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge value="Small" className="px-2 py-1 text-xs bg-black ring-1" />
      <Badge value="Medium" className=" ring-1 text-sm py-1.5 px-3 bg-gray text-white" />
      <Badge value="Large" className="px-4 py-2 text-lg text-black bg-yellow-500 ring-1" />
      <Badge value="XLarge" className=" ring-1 text-xl py-2.5 px-4.5 bg-red-500 text-white" />
    </div>
  ),
};
