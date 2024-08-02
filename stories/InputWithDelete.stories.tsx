// stories/InputWithDelete.stories.tsx
import { useState, ChangeEvent } from 'react';
import { Meta, StoryObj, StoryFn } from '@storybook/react';
import InputWithDelete from '../src/ui/InputWithDelete';

const meta: Meta<typeof InputWithDelete> = {
  title: 'GAELO FLOW COMPONENTS/InputWithDelete',
  component: InputWithDelete,
  argTypes: {
    label: { control: 'text', description: 'Label for the input field.' },
    value: { control: 'text', description: 'Value of the input field.' },
    fieldName: { control: 'text', description: 'Name of the field.' },
    fieldsToRemove: { control: 'array', description: 'Fields to remove.' },
    readOnly: { control: 'boolean', description: 'Sets the input field as read-only.' },
    required: { control: 'boolean', description: 'Sets the input field as required.' },
    placeholder: { control: 'text', description: 'Placeholder text for the input field.' },
  },
  tags: ['molecules', 'input', 'form', 'autodocs'],
} satisfies Meta<typeof InputWithDelete>;

export default meta;

type Story = StoryObj<typeof InputWithDelete>;

const Template: StoryFn<typeof InputWithDelete> = (args) => {
  const [value, setValue] = useState<string | null>(args.value || '');
  const [fieldsToRemove, setFieldsToRemove] = useState<string[]>(args.fieldsToRemove || []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange(e);
  };

  const handleRemove = (field: string, checked: boolean) => {
    setFieldsToRemove((prev) =>
      checked ? [...prev, field] : prev.filter((item) => item !== field)
    );
    args.onRemove(field, checked);
  };

  return (
    <InputWithDelete
      {...args}
      value={value}
      onChange={handleChange}
      onRemove={handleRemove}
      fieldsToRemove={fieldsToRemove}
    />
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Default Input',
    value: '',
    fieldName: 'defaultField',
    fieldsToRemove: [],
    readOnly: false,
    required: false,
    placeholder: 'Enter text',
    onChange: (e: ChangeEvent<HTMLInputElement>) => console.log('Change event', e),
    onRemove: (field: string, checked: boolean) => console.log('Remove event', field, checked),
  },
};

export const WithInitialValue: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'With Initial Value',
    value: 'Initial Value',
    fieldName: 'initialValueField',
    fieldsToRemove: [],
    readOnly: false,
    required: true,
    placeholder: 'Enter text',
    onChange: (e: ChangeEvent<HTMLInputElement>) => console.log('Change event', e),
    onRemove: (field: string, checked: boolean) => console.log('Remove event', field, checked),
  },
};

export const ReadOnly: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Read Only Input',
    value: 'Read Only Value',
    fieldName: 'readOnlyField',
    fieldsToRemove: [],
    readOnly: true,
    required: false,
    placeholder: 'Enter text',
    onChange: (e: ChangeEvent<HTMLInputElement>) => console.log('Change event', e),
    onRemove: (field: string, checked: boolean) => console.log('Remove event', field, checked),
  },
};

export const FieldMarkedForRemoval: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Field Marked For Removal',
    value: 'Removable Value',
    fieldName: 'removableField',
    fieldsToRemove: ['removableField'],
    readOnly: false,
    required: false,
    placeholder: 'Enter text',
    onChange: (e: ChangeEvent<HTMLInputElement>) => console.log('Change event', e),
    onRemove: (field: string, checked: boolean) => console.log('Remove event', field, checked),
  },
};