// AccordionPatient.stories.tsx

import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AccordionPatient from '../src/content/AccordionPatient';
import Patient from '../src/model/Patient';
import Study from '../src/model/Study';
import Series from '../src/model/Series';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const transformPatient = (data: any): Patient => {
  const patient = new Patient(data.id);
  patient.setPatientId(data.patientId);
  patient.setPatientName(data.patientName);
  patient.setPatientBirthDate(data.patientBirthDate);
  patient.setPatientSex(data.patientSex);

  data.studies.forEach((studyData: any) => {
    const study = new Study(studyData.id);
    study.studyDescription = studyData.studyDescription;
    study.studyDate = studyData.studyDate;
    study.studyTime = studyData.studyTime;
    study.studyInstanceUID = studyData.studyInstanceUID;

    studyData.series.forEach((seriesData: any) => {
      const series = new Series(seriesData.id);
      series.modality = seriesData.modality;
      series.seriesDescription = seriesData.seriesDescription;
      series.seriesNumber = seriesData.seriesNumber;
      series.seriesDate = seriesData.seriesDate;
      series.seriesTime = seriesData.seriesTime;
      series.seriesInstanceUID = seriesData.seriesInstanceUID;
      series.instances = seriesData.instances;
      study.addSeries(series);
    });

    patient.addStudy(study);
  });

  return patient;
};

const patientsData = [
  {
    id: '89083e2b-c811de66-692d1fe7-cda37cfe-9805effd',
    patientId: '202200419918105350042',
    patientName: 'Alice Smith',
    patientBirthDate: '19800520',
    patientSex: 'F',
    studies: [
      {
        id: '056aa65d-96dce3c7-4498131f-b8911156-64699216',
        studyDescription: 'PET0',
        studyDate: '20220315',
        studyTime: '114919',
        studyInstanceUID: '1.2.276.0.7230010.3.1.2.1664247091.88.1703691677.1279636',
        series: [
          {
            id: '5e64bb6f-d4f18a56-4b5077e6-1c2d80c3-f6e8450a',
            modality: 'PT',
            seriesDescription: 'Q. CLEAR 400',
            seriesNumber: '14',
            seriesDate: '20220315',
            seriesTime: '115335',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691678.1279678',
            instances: Array.from({ length: 515 }, (_, i) => `instance-${i}`),
          },
          {
            id: '7d909a90-dbf2d491-36ea8164-bdccec80-c22d3381',
            modality: 'CT',
            seriesDescription: 'CE Standard',
            seriesNumber: '2',
            seriesDate: '20220315',
            seriesTime: '115136',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691677.1279647',
            instances: Array.from({ length: 1255 }, (_, i) => `instance-${i}`),
          }
        ],
      }
    ]
  },
  {
    id: 'a9183e2b-c811de66-692d1fe7-cda37cfe-9b07effd',
    patientId: '202200429918105350043',
    patientName: 'Bob Johnson',
    patientBirthDate: '19730310',
    patientSex: 'M',
    studies: [
      {
        id: '056aa65d-96dce3c7-4498131f-b8911156-64699216',
        studyDescription: 'MRI Brain',
        studyDate: '20220110',
        studyTime: '093000',
        studyInstanceUID: '1.2.276.0.7230010.3.1.2.1664247091.88.1703691677.1279636',
        series: [
          {
            id: '5e64bb6f-d4f18a56-4b5077e6-1c2d80c3-f6e8450a',
            modality: 'MRI',
            seriesDescription: 'Axial T1',
            seriesNumber: '1',
            seriesDate: '20220110',
            seriesTime: '093500',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691678.1279678',
            instances: Array.from({ length: 200 }, (_, i) => `instance-${i}`),
          },
          {
            id: '7d909a90-dbf2d491-36ea8164-bdccec80-c22d3381',
            modality: 'MRI',
            seriesDescription: 'Sagittal T2',
            seriesNumber: '2',
            seriesDate: '20220110',
            seriesTime: '094000',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691677.1279647',
            instances: Array.from({ length: 250 }, (_, i) => `instance-${i}`),
          }
        ],
      }
    ]
  },
  {
    id: 'b0183e2b-c811de66-692d1fe7-cda37cfe-9b07effd',
    patientId: '202200439918105350044',
    patientName: 'Charlie Brown',
    patientBirthDate: '19601212',
    patientSex: 'M',
    studies: [
      {
        id: '056aa65d-96dce3c7-4498131f-b8911156-64699216',
        studyDescription: 'CT Chest',
        studyDate: '20220401',
        studyTime: '141500',
        studyInstanceUID: '1.2.276.0.7230010.3.1.2.1664247091.88.1703691677.1279636',
        series: [
          {
            id: '5e64bb6f-d4f18a56-4b5077e6-1c2d80c3-f6e8450a',
            modality: 'CT',
            seriesDescription: 'Axial Lung',
            seriesNumber: '1',
            seriesDate: '20220401',
            seriesTime: '141700',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691678.1279678',
            instances: Array.from({ length: 300 }, (_, i) => `instance-${i}`),
          },
          {
            id: '7d909a90-dbf2d491-36ea8164-bdccec80-c22d3381',
            modality: 'CT',
            seriesDescription: 'Coronal Lung',
            seriesNumber: '2',
            seriesDate: '20220401',
            seriesTime: '142000',
            seriesInstanceUID: '1.2.276.0.7230010.3.1.3.1664247091.88.1703691677.1279647',
            instances: Array.from({ length: 350 }, (_, i) => `instance-${i}`),
          }
        ],
      }
    ]
  }
];

const patients = patientsData.map(transformPatient);

const meta = {
  title: 'GAELO FLOW COMPONENTS/AccordionPatient',
  component: AccordionPatient,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ],
  argTypes: {
    patient: { control: 'object' },
    onEditPatient: { action: 'onEditPatient' },
    onDeletePatient: { action: 'onDeletePatient' },
  },
  tags: ['molecules', 'accordion', 'patient', 'autodocs'],
} satisfies Meta<typeof AccordionPatient>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    patient: patients[0],
    onEditPatient: action('edit-patient'),
    onDeletePatient: action('delete-patient'),
  },
};

export const MultiplePatients: Story = {
  args: {
    patient: patients[0],
    onEditPatient: action('edit-patient'),
    onDeletePatient: action('delete-patient'),
  },
  render: (args) => (
    <>
      {patients.map((patient) => (
        <AccordionPatient
          key={patient.id}
          patient={patient}
          onEditPatient={args.onEditPatient}
          onDeletePatient={args.onDeletePatient}
        />
      ))}
    </>
  ),
};
