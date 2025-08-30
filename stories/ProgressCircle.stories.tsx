import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressCircle from '../src/ui/ProgressCircle';

const meta: Meta<typeof ProgressCircle> = {
  title: "GAELO FLOW UI/ProgressCircle",
  component: ProgressCircle,
  argTypes: {
    progress: { control: { type: 'number', min: 0, max: 100 } },
    text: { control: 'text' },
    size: { control: { type: 'number', min: 50, max: 500 } },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    progress: 50,
    text: '50%',
    size: 240,
  },
} satisfies Story;

export const Complete = {
  args: {
    progress: 100,
    text: '100%',
    size: 240,
  },
} satisfies Story;

export const Incomplete = {
  args: {
    progress: 25,
    text: '25%',
    size: 240,
  },
} satisfies Story;

export const Large = {
  args: {
    progress: 75,
    text: '75%',
    size: 400,
  },
} satisfies Story;

export const Small = {
  args: {
    progress: 75,
    text: '75%',
    size: 100,
  },
} satisfies Story;

export const MultipleCircles = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ProgressCircle progress={25} text="25%" size={100} />
      <ProgressCircle progress={50} text="50%" size={150} />
      <ProgressCircle progress={75} text="75%" size={200} />
      <ProgressCircle progress={100} text="100%" size={250} />
    </div>
  ),
} satisfies Story;
