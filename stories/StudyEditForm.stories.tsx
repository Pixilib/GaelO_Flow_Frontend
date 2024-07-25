import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Study, StudyPayload, StudyMainDicomTags, PatientMainDicomTags } from '../src/utils/types';
import StudyEditForm from '../src/content/studies/StudyEditForm';

const studyMainDicomTags: StudyMainDicomTags = {
    accessionNumber: '123456',
    studyDate: '2023-01-01',
    studyDescription: 'Abdomen Ultrasound',
    studyId: 'STUDY123',
    studyInstanceUID: '1.2.840.113619.2.55.3.60468865.283.1517878807.467',
    studyTime: '12:00:00',
};

const patientMainDicomTags: PatientMainDicomTags = {
    patientBirthDate: '19900101',
    patientId: 'patient-1',
    patientName: 'John Doe',
    patientSex: 'M',
};

const studyData: Study = {
    id: 'study-1',
    isStable: true,
    labels: [],
    lastUpdate: '2023-07-20T14:48:00.000Z',
    mainDicomTags: studyMainDicomTags,
    patientMainDicomTags: patientMainDicomTags,
    parentPatient: 'parent-1',
    series: [],
    type: 'Study',
};

const meta: Meta<typeof StudyEditForm> = {
    title: 'GAELO FLOW COMPONENTS/StudyEditForm',
    component: StudyEditForm,
    argTypes: {
        data: { control: 'object', description: 'Les données de l\'étude à éditer.' },
        onSubmit: { action: 'onSubmit', description: 'Action déclenchée lorsque le formulaire est soumis.' },
        onCancel: { action: 'onCancel', description: 'Action déclenchée lorsque le formulaire est annulé.' },
    },
    tags: ['molecules', 'form', 'study', 'autodocs'],
} satisfies Meta<typeof StudyEditForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: studyData,
        onSubmit: ( studyId: string, payload: StudyPayload,) => {
            action('submit-form')({ studyId, payload });
            console.log('Données de l\'étude soumises:', { studyId, payload });
        },
        onCancel: action('cancel-form'),
    },
} satisfies Story;

export const EmptyForm: Story = {
    args: {
        data: {
            ...studyData,
            mainDicomTags: {
                accessionNumber: '',
                studyDate: '',
                studyDescription: '',
                studyId: '',
                studyInstanceUID: studyData.mainDicomTags.studyInstanceUID, // keep this as it is required
                studyTime: '',
            },
        },
        onSubmit: (payload: StudyPayload, studyId: string) => {
            action('submit-form')({ studyId, payload });
            console.log('Données de l\'étude soumises:', { studyId, payload });
        },
        onCancel: action('cancel-form'),
    },
} satisfies Story;
