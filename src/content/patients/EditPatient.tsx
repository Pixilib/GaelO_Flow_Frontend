import React from "react";
import Patient from "../../model/Patient";
import { modifyPatient } from "../../services";
import { useCustomMutation, useCustomToast } from "../../utils";
import { PatientPayload, OrthancResponse } from "../../utils/types";
import PatientEditForm from './PatientEditForm';
import { Modal } from "../../ui";

type EditPatientProps = {
    patient: Patient;
    onEditPatient: (patient: Patient) => void;
    onClose: () => void;
    show: boolean;
    className?: string;
}

const EditPatient: React.FC<EditPatientProps> = ({ patient, onEditPatient, onClose, show, className }) => {
    const { toastSuccess, toastError } = useCustomToast();

    const { mutateAsync: mutatePatient } = useCustomMutation<OrthancResponse, { id: string, payload: PatientPayload }>(
        ({ id, payload }) => modifyPatient(id, payload),
        [['jobs']],
        {
            onSuccess: async () => {
                toastSuccess(`Patient updated successfully`);
                onEditPatient(patient);
                onClose();
            },
            onError: (error: any) => {
                toastError(`Failed to update patient: ${error}`);
            }
        }
    );

    const handleSubmit = ({ id, payload }: { id: string; payload: PatientPayload }) => {
        mutatePatient({ id, payload });
    };

    return (
        <Modal show={show} size='xl' className={className}> {/* Application de la classe */}
            <Modal.Header onClose={onClose}> Edit patient </Modal.Header>
            <Modal.Body>
                <PatientEditForm data={patient} onSubmit={handleSubmit} onCancel={onClose} />
            </Modal.Body>
        </Modal>
    );
};

export default EditPatient;
