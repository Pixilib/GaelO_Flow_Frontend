import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConfirmModal from '../src/ui/ConfirmModal';
import Button from '../src/ui/Button';
import { Colors } from '../src/utils';
import { useModal } from '../src/utils/useModal';


const meta: Meta<typeof ConfirmModal> = {
  
  title: 'Gaelo FLow UI/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    dialogRef: { control: 'object', description: 'Reference to the dialog element' },
    closeDialog: { action: 'closeDialog', description: 'Callback function to close the dialog' },
    onConfirm: { action: 'onConfirm', description: 'Callback function when the confirm button is clicked' },
    className: { control: 'text', description: 'tailwind css class for the modal' },
    message: { control: 'text', description: 'The message displayed in the modal' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const { dialogRef, openDialog, closeDialog } = useModal();
  return (
    <div>
      <Button color={Colors.primary} onClick={openDialog}>Open Modal</Button>
      <ConfirmModal {...args} dialogRef={dialogRef} closeDialog={closeDialog} />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    message: 'Are you sure you want to proceed?',
    onConfirm: action('onConfirm'),
  },
};

export const WithCustomClass: Story = {
  render: Template,
  args: {
    message: 'This is a custom class modal',
    className: 'bg-dark text-white',
    onConfirm: action('onConfirm'),
  },
};

export const WithLongMessage: Story = {
  render: Template,
  args: {
    message: 'Are you sure you want to proceed? This action is irreversible and will permanently affect your data. Please confirm that you have considered all the consequences before proceeding.',
    onConfirm: action('onConfirm'),
  },
};

export const WithFormattedMessage: Story = {
  render: Template,
  args: {
    message: (
      <div>
        <p><strong>Important:</strong> This action cannot be undone.</p>
        <p>Do you want to continue?</p>
      </div>
    ),
    onConfirm: action('onConfirm'),
  },
};

export const WithEmojiMessage: Story = {
  render: Template,
  args: {
    message: (
      <div>
        <p>🚨 <strong>Warning:</strong> This will delete all your data!</p>
        <p>Are you absolutely sure?</p>
      </div>
    ),
    onConfirm: action('onConfirm'),
  },
};