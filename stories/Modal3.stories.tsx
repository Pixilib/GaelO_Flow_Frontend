import { MdDeleteForever } from "react-icons/md"; 
import type { Meta, StoryObj } from '@storybook/react';
import Modal3 from '../src/ui/Modal3';
import Card, { CardHeader, CardBody, CardFooter } from '../src/ui/Card';
import { Colors } from '../src/utils';
import { Button } from '../src/ui';


const meta = {
  title:'GAELO FLOW UI/Modal3',
  component: Modal3,
  argTypes: {
    triggerButton: { control: 'element' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Modal3>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Modal</Button>,
    children: 'This is the modal content.',
  },
} satisfies Story;

export const WithCustomClass = {
  args: {
    triggerButton: <Button color={Colors.primary}>Open Modal</Button>,
    className: 'bg-gray-200',
    children: 'This is the modal content with a custom Tailwind class.',
  },
} satisfies Story;

export const WithCard = {
  args: {
    triggerButton: <MdDeleteForever size={'1.7rem'} />,
    children: (
      <Card bordered className="bg-white">
        <CardHeader title="Card Title" color={Colors.primary} />
        <CardBody>
          This is the body of the card within the modal.
        </CardBody>
        <CardFooter>
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Action
          </button>
        </CardFooter>
      </Card>
    ),
  },
} satisfies Story;