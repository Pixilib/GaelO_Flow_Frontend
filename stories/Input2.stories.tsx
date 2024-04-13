import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input2 from '../src/ui/Input2';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Colors } from '../src/utils/enums';

const meta: Meta<typeof Input2> = {
  title: 'GAELO FLOW UI/Input2',
  component: Input2,
  argTypes: {
    label: {
      control: { type: 'object' },
      defaultValue: { value: 'Default label' }
    },
    'label.align' :{
      control: { type: 'select', options: ['left', 'center', 'right'] },
      defaultValue: 'left',
    }, 
    'label.className': { control: 'text' },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    },
    variant: {
      control: { type: 'select', options: ['light', 'primary', 'success'] },
    },
    type: { control: 'select', options: ["email", "number", "password", "search", "text", "time"] },
    placeholder: { control: 'text' },
    bordered: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small size',
    onChange: action('onChange'),
    label: { value: 'Small Input', align: 'left' },
  },
};

export const MediumWithIcons: Story = {
  args: {
    size: 'md',
    svgLeft: <FaSearch />,
    svgRight: <AiOutlineClose />,
    placeholder: 'Medium size with icons',
    onChange: action('onChange'),
    label: { value: 'Search', align: 'center' },
  },
};

export const LargeBorderedPrimary: Story = {
  args: {
    size: 'lg',
    bordered: true,
    variant: Colors.primary,
    placeholder: 'Large, bordered, primary color',
    onChange: action('onChange'),
    label: { value: 'Large Input', align: 'right' },
  },
};

export const MultipleInputs: Story = {
  render: (args) => (
    <div className="relative gap-y-7">
      <Input2 {...args} size="sm" placeholder="Small" svgLeft={<FaSearch />} svgRight={<AiOutlineClose />} label={{ value: 'First Input', align: 'left' }} />
      <Input2 {...args} size="md" placeholder="Medium" variant={Colors.success} svgLeft={<FaSearch />} label={{ value: 'Second Input', align: 'center' }} />
      <Input2 {...args} size="lg" placeholder="Large" variant={Colors.primary} svgRight={<AiOutlineClose />} label={{ value: 'Third Input', align: 'right' }} />
      <Input2 {...args} size="lg" placeholder="Large" variant={Colors.primary} svgRight={<AiOutlineClose />} label={{ value: 'Third Input', align: 'right' }} />
      <Input2 {...args} size="xl" placeholder="Large" variant={Colors.light}svgRight={<AiOutlineClose />} label={{ value: 'Fourth Input', align: 'right' }} />
    </div>
  ),
  args: {
    onChange: action('onChange'),
  },
};
