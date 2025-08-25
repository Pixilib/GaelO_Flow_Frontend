import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../src/ui/Badge';

const meta = {
  title: 'GAELO FLOW UI/Badge',
  component: Badge,
  argTypes: {
    value: { control: 'text' },
    className: { control: 'text' },
    size: { 
      control: 'select', 
      options: ["sm", "md", "lg", "xl"] 
      },
      variant: { 
        control: 'select', 
        options: ["default", "success", "danger", "warning"] 
        },
        },
      tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    value: 'Default Badge',
    variant: 'default',
    size: 'sm',
  },
} satisfies Story;

export const DefaultWithSizeLg = {
  args: {
    value: 'Default Badge',
    variant: 'default',
    size: 'lg',
  },
} satisfies Story;

export const Success = {
  args: {
    value: 'Success Badge',
    variant: 'success',
size: 'sm',
  },
} satisfies Story;

export const Danger = {
  args: {
    value: 'Danger Badge',
    variant: 'danger',
    size: 'sm',
  },
} satisfies Story;

export const Warning = {
  args: {
    value: 'Warning Badge',
    variant: 'warning',
    size: 'sm',
  },
} satisfies Story;

export const Sizes = {
  args: {
    value: 'Badge',
    variant: 'default',
  },
  render: (args) => (
    <div className="grid text-center place-content-center gap-y-4">
      <Badge {...args} value="SM: fdsqfdsqfdsq" size="sm" />
      <Badge {...args} value="MD: fdsqfdsqfq" size="md" variant="warning" />
      <Badge {...args} value="LG: fdsqfdsq" size="lg" />
      <Badge {...args} value="XL: fdsqfdsqf" size="xl" variant="danger" />
    </div>
  ),
} satisfies Story;
