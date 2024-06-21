import type { Meta, StoryObj } from '@storybook/react';
import FormCard from '../src/ui/FormCard';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta = {
  title: 'GAELO FLOW UI/FormCard',
  component: FormCard,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the form card',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Function to handle form submission',
    },
    children: {
      control: 'text',
      description: 'Content of the form card',
    },
    className: {
      control: 'text',
      description: 'Additional class names for styling',
    },
    collapsible: {
      control: 'boolean',
      description: 'Determines if the card can be collapsed',
    },
    onClose: {
      action: 'close-button-clicked',
      description: 'Function to handle the close button action',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Form Card Title',
    onSubmit: action('form-submitted'),
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.',
    className: '',
    collapsible: false,
  },
} satisfies Story;

export const Collapsible = {
  args: {
    title: 'Collapsible Form Card',
    onSubmit: action('form-submitted'),
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.',
    className: '',
    collapsible: true,
  },
} satisfies Story;

export const WithCloseButton = () => {
  const [showFormCard, setShowFormCard] = useState(false);

  const handleButtonClick = () => {
    setShowFormCard(!showFormCard);
  };

  const handleCloseButton = () => {
    setShowFormCard(false);
  };

  return (
    <>
      <button onClick={handleButtonClick} className="p-3 text-white rounded bg-success">Toggle Form Card</button>
      {showFormCard && (
        <FormCard
          title="Form Card with Close Button"
          onClose={handleCloseButton}
          onSubmit={action('form-submitted')}
          className=""
          collapsible={false}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
        </FormCard>
      )}
    </>
  );
};

export const CustomClass = {
  args: {
    title: 'Custom Class Form Card',
    onSubmit: action('form-submitted'),
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.',
    className: 'bg-red-500 text-dark',
    collapsible: false,
  },
} satisfies Story;
