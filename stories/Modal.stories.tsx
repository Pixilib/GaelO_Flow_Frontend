import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal, { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../src/ui/Modal';
import Button from '../src/ui/Button';
import { Colors } from '../src/utils/enums';

const meta: Meta<typeof Modal> ={
  title: 'GAELO FLOW UI/Modal',
  component: Modal,
  argTypes: {
    size: {
      options: ['sm', 'lg', 'xl', 'w-full'],
      control: { type: 'select' },
      description: 'Choose the size of the Modal',
    },
    tags: ['autodocs'],
  },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateModal: Story = {
  render: (args) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <Button color={Colors.success} onClick={() => setShow(true)}>
        Click to open
      </Button>
      <Modal show={show} size={args.size}>
        <ModalHeader onClose={() => setShow(false)}>
          <ModalTitle>Header</ModalTitle>
        </ModalHeader>
        <ModalBody className="z-[2000]">
          Lorem ipsum dolor sit amet. Qui repudiandae repellat qui corporis
          molestiae eum illo distinctio ut repudiandae esse. Et facilis illo
          et aliquam labore ad enim commodi et facilis itaque est beatae odit
          ut galisum internos ut soluta dolore.

          Lorem ipsum dolor sit amet. Qui repudiandae repellat qui corporis
          molestiae eum illo distinctio ut repudiandae esse. Et facilis illo
          et aliquam labore ad enim commodi et facilis itaque est beatae odit
          ut galisum internos ut soluta dolore.

          Lorem ipsum dolor sit amet. Qui repudiandae repellat qui corporis
          molestiae eum illo distinctio ut repudiandae esse. Et facilis illo
          et aliquam labore ad enim commodi et facilis itaque est beatae odit
          ut galisum internos ut soluta dolore.
        </ModalBody>
        <ModalFooter>
          Footer
        </ModalFooter>
      </Modal>
    </div>
  );
;
  }
};