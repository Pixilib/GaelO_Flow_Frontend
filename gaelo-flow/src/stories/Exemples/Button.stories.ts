import Button from './../../RenderComponents/Button';
import type { Meta, StoryObj } from '@storybook/react';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {};
// type ButtonProps = {
//   color: 'purple' | 'green'
//   className?: string,
//   bordered?: boolean
//   children: React.ReactNode
//   [key :string] :any 
// }

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  decorators: [],
  name: 'Default',
  parameters: {},
  args: {
    color: 'purple',
    bordered: true,
  },
};

export const notBordered: Story = {
  decorators: [],
  name: 'notBordered',
  parameters: {},
  args: {
    color: 'purple',
    bordered: false,
  },
};