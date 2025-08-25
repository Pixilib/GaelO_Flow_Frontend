import type { Meta, StoryObj } from '@storybook/react-vite';
import JobTable from '../src/admin/jobs/JobTable';

const meta: Meta<typeof JobTable> = {
  title: 'GAELO FLOW COMPONENTS/JOB/JobTable',
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
      { ID: '1', Type: 'Download', Progress: '60%', State: 'Active' }as never,
      { ID: '2', Type: 'Upload', Progress: '30%', State: 'Paused' }as never,
      { ID: '3', Type: 'Sync', Progress: '90%', State: 'Completed' }as never,
      { ID: '4', Type: 'Analyze', Progress: '75%', State: 'Active' }as never,
      { ID: '5', Type: 'Download', Progress: '10%', State: 'Paused' }as never,
      { ID: '6', Type: 'Upload', Progress: '50%', State: 'Active' }as never,
      { ID: '7', Type: 'Sync', Progress: '100%', State: 'Completed' }as never,
      { ID: '8', Type: 'Analyze', Progress: '25%', State: 'Paused' }as never,
      { ID: '9', Type: 'Download', Progress: '40%', State: 'Active' }as never,
      { ID: '10', Type: 'Upload', Progress: '20%', State: 'Paused' }as never,
      { ID: '11', Type: 'Sync', Progress: '80%', State: 'Completed' }as never,
      { ID: '12', Type: 'Analyze', Progress: '50%', State: 'Active' }as never,
      { ID: '13', Type: 'Download', Progress: '90%', State: 'Paused' }as never,
      { ID: '14', Type: 'Upload', Progress: '60%', State: 'Active' }as never,
      { ID: '15', Type: 'Sync', Progress: '30%', State: 'Completed' }as never,
      { ID: '16', Type: 'Analyze', Progress: '75%', State: 'Paused' }as never,
      { ID: '17', Type: 'Download', Progress: '10%', State: 'Active' }as never,
      { ID: '18', Type: 'Upload', Progress: '50%', State: 'Paused' }as never,
      { ID: '19', Type: 'Sync', Progress: '100%', State: 'Completed' }as never,
      { ID: '20', Type: 'Analyze', Progress: '25%', State: 'Active' }as never,
    ],
  },
};
