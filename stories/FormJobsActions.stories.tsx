import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProgressJobs from '../src/query/ProgressJobs';
import FormJobsActions from '../src/content/FormJobsActions';

const meta: Meta<typeof FormJobsActions> = {
  title: 'GAELO FLOW COMPONENTS/FormJobsActions',
  component: FormJobsActions,
  argTypes: {
    isSubmitted: { control: 'boolean', description: 'Indicates if the form is submitted.' },
    jobId: { control: 'text', description: 'The ID of the job in progress.' },
    isJobCompleted: { control: 'boolean', description: 'Indicates if the job is completed.' },
    onCancel: { action: 'cancel', description: 'Function to handle cancellation.' },
    onSubmit: { action: 'submit', description: 'Function to handle submission.' },
    onRefresh: { action: 'refresh', description: 'Function to handle refresh.' },
  },
  tags: ['atoms', 'button', 'actions', 'autodocs'],
} satisfies Meta<typeof FormJobsActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitted: false,
    jobId: null,
    isJobCompleted: false,
    onCancel: action('cancel'),
    onSubmit: action('submit'),
    onRefresh: action('refresh'),
  },
};

export const SubmittedWithProgress: Story = {
  args: {
    isSubmitted: true,
    jobId: 'job123',
    isJobCompleted: false,
    onCancel: action('cancel'),
    onSubmit: action('submit'),
    onRefresh: action('refresh'),
  },
  render: (args) => (
    <>
      <FormJobsActions {...args} />
      <ProgressJobs jobId={args.jobId!} />
    </>
  ),
};

export const JobCompleted: Story = {
  args: {
    isSubmitted: true,
    jobId: 'job123',
    isJobCompleted: true,
    onCancel: action('cancel'),
    onSubmit: action('submit'),
    onRefresh: action('refresh'),
  },
  render: (args) => (
    <FormJobsActions {...args} />
  ),
};
