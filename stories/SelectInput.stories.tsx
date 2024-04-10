import type { Meta, StoryObj } from '@storybook/react';
import SelectionInput from '../src/ui/SelectInput';
import { action } from '@storybook/addon-actions';



const meta: Meta<typeof SelectionInput> = {
  title: 'GAELO FLOW UI/SelectionInput',
  component: SelectionInput,
  argTypes: {
    onChange: { action: 'changed' },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    isMulti: { control: 'boolean' },
  },
  tags:['autodocs']
} satisfies Meta<typeof SelectionInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }],
    onChange: action('onChange'),
    placeholder: 'Select...',
    isMulti: false,
  }
} satisfies Story;

export const RedBorder: Story = {
  args: {
    ...Default.args,
    styles: {
      control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? 'red' : 'lightcoral',
        boxShadow: state.isFocused ? '0 0 0 1px red' : 'none',
        '&:hover': {
          borderColor: state.isFocused ? 'darkred' : 'red',
        },
      }),
    },
  }
} satisfies Story;

export const BlueBorder: Story = {
  args: {
    ...Default.args,
    styles: {
      control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? 'blue' : 'lightblue',
        boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
        '&:hover': {
          borderColor: state.isFocused ? 'darkblue' : 'blue',
        },
      }),
    },
  }
} satisfies Story;
