import type { Meta, StoryObj } from '@storybook/react';
import Welcome from '../../Welcome';

const meta = {
  title: 'Example/Welcome',
  component: Welcome,
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WelcomeStory: Story = {};
export const Simple: Story = {
  decorators: [],
  name: 'So simple!',
  parameters: {},
};
