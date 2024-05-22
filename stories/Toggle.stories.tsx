import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Toggle from '../src/ui/menu/Toogle';

const meta = {
  title: 'GAELO FLOW UI/Toggle',
  component: Toggle,
  argTypes: {
    onChange: { action: 'toggled' },
  },
  tags: ['autodocs', 'atoms']
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: action('toggled'),
  },
};
