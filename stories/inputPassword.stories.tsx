import type { Meta, StoryObj } from '@storybook/react-vite';
import InputPassword from '../src/ui/InputPassword';
import { Label } from '../src/ui';

const meta = {
  title: "GAELO FLOW UI/InputPassword",

  component: InputPassword,
  argTypes: {
    className: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    autoComplete: { control: 'text' },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    value: '',
    placeholder: 'Enter your password',
    label: 'Password',
    autoComplete: 'off',
  },
} satisfies Story;

export const WithCustomLabel = {
  args: {
    value: '',
    placeholder: 'Enter your password',
    label: <Label value="Password" />,
    autoComplete: 'off',
  },
} satisfies Story;

export const Valid = {
  args: {
    value: 'Test@1234Test',
    placeholder: 'Enter your password',
    label: 'Password',
    autoComplete: 'off',
  },
} satisfies Story;
