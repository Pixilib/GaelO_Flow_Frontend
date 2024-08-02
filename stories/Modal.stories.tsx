// Modal.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Colors } from '../src/utils';
import { Button, Modal } from '../src/ui';
import { useState } from 'react';

const meta = {
  title: "GAELO FLOW UI/Modal",
  component: Modal,
  argTypes: {
    show: { control: 'boolean', description: 'Whether the modal is shown.' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg', 'xl', 'w-full'],
      description: 'Size of the modal.',
    },
    className: { control: 'text', description: 'Custom CSS class for the modal.' },
    children: { control: 'text', description: 'Content of the modal.' },
  },
  parameters: {
    tags: ['Component', 'UI', 'Modal'],
    notes: 'This component is used to display modal dialogs in the application.',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => {
    setShow(false);
    args.closeDialog();
  };

  return (
    <div>
      <Button color={Colors.primary} onClick={openModal}>Open Modal</Button>
      <Modal {...args} show={show} closeDialog={closeModal}>
        {args.children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    show: false,
    size: 'lg',
    children: 'This is the default modal content.',
    closeDialog: action('closeDialog'),
  },
};

export const WithBackgroundDark: Story = {
  render: Template,
  args: {
    show: false,
    size: 'lg',
    children: 'This is a modal with a custom class.',
    className: 'bg-dark text-white',
    closeDialog: action('closeDialog'),
  },
};

export const WithFormattedMessage: Story = {
  render: Template,
  args: {
    show: false,
    size: 'lg',
    children: (
      <div>
        <h2 className="text-lg font-bold">Formatted Content</h2>
        <p>This modal contains formatted content including headings, paragraphs, and more.</p>
      </div>
    ),
    closeDialog: action('closeDialog'),
  },
};
