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
      { ID: '5', Type: 'Download', Progress: '10%', State: 'Paused' },
      { ID: '6', Type: 'Upload', Progress: '50%', State: 'Active' },
      { ID: '7', Type: 'Sync', Progress: '100%', State: 'Completed' },
      { ID: '8', Type: 'Analyze', Progress: '25%', State: 'Paused' },
      { ID: '9', Type: 'Download', Progress: '40%', State: 'Active' },
      { ID: '10', Type: 'Upload', Progress: '20%', State: 'Paused' },
      { ID: '11', Type: 'Sync', Progress: '80%', State: 'Completed' },
      { ID: '12', Type: 'Analyze', Progress: '50%', State: 'Active' },
      { ID: '13', Type: 'Download', Progress: '90%', State: 'Paused' },
      { ID: '14', Type: 'Upload', Progress: '60%', State: 'Active' },
      { ID: '15', Type: 'Sync', Progress: '30%', State: 'Completed' },
      { ID: '16', Type: 'Analyze', Progress: '75%', State: 'Paused' },
      { ID: '17', Type: 'Download', Progress: '10%', State: 'Active' },
      { ID: '18', Type: 'Upload', Progress: '50%', State: 'Paused' },
      { ID: '19', Type: 'Sync', Progress: '100%', State: 'Completed' },
      { ID: '20', Type: 'Analyze', Progress: '25%', State: 'Active' },
    ],
  },
};
