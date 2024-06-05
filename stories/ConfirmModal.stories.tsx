import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConfirmModal from '../src/ui/ConfirmModal';
import Button from '../src/ui/Button';
import { Colors } from '../src/utils';



const meta = {
  title: 'Gaelo Flow UI/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    triggerButton: { 
      control: 'object',
      description: 'React element used to trigger the modal',
    },
    className: { 
      control: 'text',
      description: 'Additional classes for the modal',
    },
    message: { 
      control: 'text',
      description: 'Message displayed in the modal',
    },
    onConfirm: { 
      action: 'confirmed',
      description: 'Function called when the confirmation button is clicked',
    },
  },
  tags: ['confirm', 'modal', 'autodocs'],
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Confirmation Modal</Button>,
    message: 'Are you sure you want to proceed?',
    onConfirm: () => console.log('Confirmed'),
  },
} satisfies Story;

export const WithCustomClass = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Confirmation Modal</Button>,
    className: 'bg-gray-200 text-black italic',
    message: 'Are you sure you want to proceed with this custom class?',
    onConfirm: () => console.log('Confirmed'),
  },
} satisfies Story;
export const WithLongMessage = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Modal</Button>,
    message: 'Are you sure you want to proceed? This action is irreversible and will permanently affect your data. Please confirm that you have considered all the consequences before proceeding.',
    onConfirm: action('onConfirm'),
  },
} satisfies Story;
export const WithCustomTriggerButton = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Confirmation Modal</Button>,
    message: 'Do you confirm the action triggered by the custom button?',
    onConfirm: () => console.log('Confirmed'),
  },
} satisfies Story;


export const withBackgroundAlmond = {
    args: {
        triggerButton: <Button color={Colors.primary}>Open Confirmation Modal</Button>,
        className: 'bg-almond text-white',
        message: 'Do you confirm the action triggered by the custom button?',
        onConfirm: () => console.log('Confirmed'),
    },
    } satisfies Story;

    export const withBackgroundZinc = {
        args:{
            triggerButton : <Button color={Colors.primary}>Open Confirmation Modal</Button>,
            className: 'bg-zinc-100 text-darkGray',
            message: 'Do you confirm the action triggered by the custom button?',
            onConfirm: () => console.log('Confirmed'),
        }
    }

