import type { Meta, StoryObj } from '@storybook/react';
import JobTable from '../src/admin/jobs/JobTable';

const meta: Meta<typeof JobTable> = {
  title: 'GAELO FLOW UI/JobTable',
  component: JobTable,
  argTypes: {
    data: {
      control: 'object',
      defaultValue: [
        { ID: '1', Type: 'Download', Progress: '60%', State: 'Active' },
        { ID: '2', Type: 'Upload', Progress: '30%', State: 'Paused' },
        { ID: '3', Type: 'Sync', Progress: '90%', State: 'Completed' },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


export const WithMultipleRows: Story = {
  args: {
    data: [
      { ID: '1', Type: 'Download', Progress: '60%', State: 'Active' },
      { ID: '2', Type: 'Upload', Progress: '30%', State: 'Paused' },
      { ID: '3', Type: 'Sync', Progress: '90%', State: 'Completed' },
      { ID: '4', Type: 'Analyze', Progress: '75%', State: 'Active' },
    ],
  },
};
