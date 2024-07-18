import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PatientEditModal from '../src/content/PatientEditModal';
import Patient from '../src/model/Patient';
import { PatientPayload } from '../src/utils/types';
import { Button } from '../src/ui';
import { Colors } from '../src/utils';

// Création d'une instance de Patient
const patient = new Patient('89083e2b-c811de66-692d1fe7-cda37cfe-9805effd');
patient.fillData({
    patientId: '202200419918105350042',
    patientName: 'Alice Doe',
    patientBirthDate: '19800520',
    patientSex: 'F',
});

const meta: Meta<typeof PatientEditModal> = {
    title: 'GAELO FLOW COMPONENTS/PatientEditModal',
    component: PatientEditModal,
    argTypes: {
        patient: { control: 'object', description: 'The patient to be edited.' },
        show: { control: 'boolean', description: 'Boolean to control the visibility of the modal.' },
        onClose: { action: 'onClose', description: 'Action triggered when the modal is closed.' },
        onSubmit: { action: 'onSubmit', description: 'Action triggered when the form is submitted.' },
    },
    tags: ['molecules', 'modal', 'patient', 'autodocs'],
} satisfies Meta<typeof PatientEditModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [showModal, setShowModal] = useState(false);
        const handleOpen = () => setShowModal(true);
        const handleClose = () => setShowModal(false);

        return (
            <>
                <Button color={Colors.success} onClick={handleOpen}>Open Edit Patient Modal</Button>
                <PatientEditModal
                    {...args}
                    show={showModal}
                    onClose={handleClose}
                    onSubmit={(patientId: string, payload: PatientPayload) => {
                        action('submit-form')({ patientId, payload });
                        console.log('Submitted Patient Data:', { patientId, payload });
                    }}
                />
            </>
        );
    },
    args: {
        patient,
        show: false,
    },
} satisfies Story;