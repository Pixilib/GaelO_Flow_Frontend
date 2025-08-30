import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import ConfirmContextProvider, { useConfirm } from '../src/services/ConfirmContextProvider';
import { Button } from '../src/ui';
import { Colors } from '../src/utils';

const meta: Meta = {
  title: 'GAELO FLOW UI/ConfirmContextProvider',
  component: ConfirmContextProvider,
  parameters: {
    tags: ['Component', 'UI', 'ConfirmContextProvider'],
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template = () => {
  const { confirm } = useConfirm();
  
  const handleClick = async () => {
    const confirmed = await confirm({
      title: 'Confirm Action',
      content: 'Do you confirm your action?',
      confirmLabel: 'Yes',
      cancelLabel: 'No',
    });

    if (confirmed) {
      action('Confirmed')();
    } else {
      action('Cancelled')();
    }
  };

  return (
    <div>
      <Button color={Colors.primary} onClick={handleClick}>Show Confirm Modal</Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ConfirmContextProvider>
      <Template />
    </ConfirmContextProvider>
  ),
  parameters: {
    docs: {
      storyDescription: 'This story demonstrates the usage of ConfirmContextProvider with a confirmation dialog.',
    },
  },
};
