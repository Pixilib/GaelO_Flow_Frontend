import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '../src/ui/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'GAELO FLOW UI/Spinner',
  component: Spinner,
  tags:['autodocs']
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSpinner: Story = {
} satisfies Story;
