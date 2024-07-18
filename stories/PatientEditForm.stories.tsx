import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientEditForm from '../src/content/PatientEditForm';
import Patient from '../src/model/Patient'; 
import { PatientPayload } from '../src/utils/types';

const patient = new Patient('89083e2b-c811de66-692d1fe7-cda37cfe-9805effd');
patient.fillData({
    patientId: '202200419918105350042',
    patientName: 'Alice',
    patientBirthDate: '19800520',
    patientSex: 'F',
});

const meta: Meta<typeof PatientEditForm> = {
  title: 'GAELO FLOW COMPONENTS/PatientEditForm',
  component: PatientEditForm,
  argTypes: {
    patient: { control: 'object', description: 'Le patient à éditer.' },
    onSubmit: { action: 'onSubmit', description: 'Action déclenchée lorsque le formulaire est soumis.' },
    onCancel: { action: 'onCancel', description: 'Action déclenchée lorsque le formulaire est annulé.' },
  },
  tags: ['molecules', 'form', 'patient', 'autodocs'],
} satisfies Meta<typeof PatientEditForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    patient,
    onSubmit: (payload: PatientPayload, patientId: string) => {
      action('submit-form')({ patientId, payload });
      console.log('Données du patient soumises:', { patientId, payload });
    },
    onCancel: action('cancel-form'),
  },
} satisfies Story;

export const FilledForm: Story = {
  args: {
    patient: (() => {
      const filledPatient = new Patient('89083e2b-c811de66-692d1fe7-cda37cfe-9805effd');
      filledPatient.fillData({
        patientId: '202200419918105350043',
        patientName: 'Robert',
        patientBirthDate: '19900101',
        patientSex: 'F',
      });
      return filledPatient;
    })(),
    onSubmit: (payload: PatientPayload, patientId: string) => {
      action('submit-form')({ patientId, payload });
      console.log('Données du patient soumises:', { patientId, payload });
    },
    onCancel: action('cancel-form'),
  },
} satisfies Story;

export const EmptyForm: Story = {
  args: {
    patient: (() => {
      const emptyPatient = new Patient('89083e2b-c811de66-692d1fe7-cda37cfe-9805effd');
      emptyPatient.fillData({
        patientId: '',
        patientName: '',
        patientBirthDate: '',
        patientSex: '',
      });
      return emptyPatient;
    })(),
    onSubmit: (payload: PatientPayload, patientId: string) => {
      action('submit-form')({ patientId, payload });
      console.log('Données du patient soumises:', { patientId, payload });
    },
    onCancel: action('cancel-form'),
  },
} satisfies Story;
