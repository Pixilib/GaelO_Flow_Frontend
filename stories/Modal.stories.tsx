import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Colors, useModal } from '../src/utils';
import { Button, Modal } from '../src/ui';

const meta = {
  title:"GAELO FLOW UI/Modal",
  component: Modal,
  argTypes: {
    dialogRef: { control: 'object', description: 'Reference to the dialog element.' },
    closeDialog: { action: 'closeDialog', description: 'Action triggered when the dialog is closed.' },
    className: { control: 'text', description: 'Custom CSS class for the modal.' },
    children: { control: 'text', description: 'Content of the modal.' },
  },
  parameters: {
    tags: ['Component', 'UI', 'Modal'],
    notes: 'This component is used to display modal dialogs in the application. It leverages the `useModal` hook to manage the modal state.',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
} as Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const { dialogRef, openDialog, closeDialog } = useModal();
  return (
    <div>
      <Button color={Colors.primary} onClick={openDialog}>Open Modal</Button>
      <Modal {...args} dialogRef={dialogRef} closeDialog={closeDialog} />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    children: 'This is the default modal content.',
    closeDialog: action('closeDialog'),
  },
};

export const WithBackgroundDark: Story = {
  render: Template,
  args: {
    children: 'This is a modal with a custom class.',
    className: 'bg-dark text-white',
    closeDialog: action('closeDialog'),
  },
};

export const WithFormattedMessage: Story = {
  render: Template,
  args: {
    children: (
      <div>
        <h2 className="text-lg font-bold">Formatted Content</h2>
        <p>This modal contains formatted content including headings, paragraphs, and more.</p>
      </div>
    ),
    closeDialog: action('closeDialog'),
  },
};

