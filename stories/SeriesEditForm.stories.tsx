import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Series, SeriesPayload } from '../src/utils/types';
import SeriesEditForm from '../src/content/series/SeriesEditForm';

const seriesData: Series = {
  id: '1',
  isStable: true,
  labels: [],
  lastUpdate: '2022-01-01T00:00:00Z',
  mainDicomTags: {
    imageOrientationPatient: null,
    manufacturer: 'Example Manufacturer',
    modality: 'CT',
    operatorsName: null,
    protocolName: null,
    seriesDescription: 'Example Description',
    seriesInstanceUID: '1.2.3.4.5.6.7',
    seriesNumber: 1,
    stationName: null,
    seriesDate: '2022-01-01',
    seriesTime: '12:00:00',
  },
  parentStudy: '1',
  status: 'Completed',
  type: 'SERIES',
  instances: [],
  expectedNumberOfInstances: null,
};

const meta: Meta<typeof SeriesEditForm> = {
  title: 'GAELO FLOW COMPONENTS/SeriesEditForm',
  component: SeriesEditForm,
  argTypes: {
    data: { control: 'object', description: 'Series data to edit.' },
    onSubmit: { action: 'submitted', description: 'Function to handle form submission.' },
    onCancel: { action: 'cancelled', description: 'Function to handle form cancellation.' },
  },
  tags: ['molecules', 'form', 'series', 'autodocs'],
} satisfies Meta<typeof SeriesEditForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = (args) => {
  const [data, setData] = useState<Series>(args.data || seriesData);

  const handleSubmit = ({ id, payload }: { id: string, payload: SeriesPayload }) => {
    console.log('Submit:', id, payload);
    args.onSubmit({ id, payload });
  };

  const handleCancel = () => {
    console.log('Cancel');
    args.onCancel();
  };

  return (
    <SeriesEditForm
      {...args}
      data={data}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    data: seriesData,
  },
};

export const WithModifiedData: Story = {
  render: Template,
  args: {
    data: {
      ...seriesData,
      mainDicomTags: {
        ...seriesData.mainDicomTags,
        manufacturer: 'Modified Manufacturer',
        modality: 'MR',
        seriesDescription: 'Modified Description',
      },
    },
  },
};

export const EmptyFields: Story = {
  render: Template,
  args: {
    data: {
      ...seriesData,
      mainDicomTags: {
        ...seriesData.mainDicomTags,
        manufacturer: null,
        modality: null,
        seriesDescription: null,
        seriesNumber: null,
        seriesDate: null,
        seriesTime: null,
      },
    },
  },
};
