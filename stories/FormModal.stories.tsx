import type { Meta, StoryObj } from '@storybook/react';
import { useState, FormEvent } from 'react';
import { action } from '@storybook/addon-actions';
import FormModal from '../src/ui/FormModal';
import { Input, Button } from '../src/ui';
import { Colors } from '../src/utils';

const meta: Meta<typeof FormModal> = {
  title: 'GAELO FLOW UI/FormModal',
  component: FormModal,
  argTypes: {
    title: { control: 'text', description: 'Le titre de la modal.' },
    show: { control: 'boolean', description: 'Booléen pour contrôler la visibilité de la modal.' },
    onClose: { action: 'onClose', description: 'Action déclenchée lorsque la modal est fermée.' },
  },
  tags: ['molecules', 'modal', 'form', 'autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormContent = () => (
  <>
    <Input label="Prénom" name="firstName" placeholder="Entrez votre prénom" required />
    <Input label="Nom de famille" name="lastName" placeholder="Entrez votre nom de famille" required />
    <Input label="Email" name="email" type="email" placeholder="Entrez votre email" required />
  </>
);

const handleSubmitForm = (event: FormEvent) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
  };
  action('submit-form')(data);
};


export const Default: Story = {
  render: (args) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
      <>
        <Button color={Colors.success} onClick={handleOpen}>Ouvrir la modal du formulaire</Button>
        <FormModal
          {...args}
          show={showModal}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmitForm}>
            <FormContent />
          </form>
        </FormModal>
      </>
    );
  },
  args: {
    title: 'Modal du formulaire par défaut',
    show: false,
  },
} satisfies Story;


export const InitiallyVisible: Story = {
  render: (args) => {
    const [showModal, setShowModal] = useState(args.show);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
      <>
        <Button color={Colors.success} onClick={handleOpen}>Ouvrir la modal du formulaire initialement visible</Button>
        <FormModal
          {...args}
          show={showModal}
          onClose={handleClose}
        >
          <form  onSubmit={handleSubmitForm}>
            <FormContent />
          </form>
        </FormModal>
      </>
    );
  },
  args: {
    title: 'Modal du formulaire initialement visible',
    show: true,
  },
} satisfies Story;
