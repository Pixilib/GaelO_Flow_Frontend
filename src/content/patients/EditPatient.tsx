import React, { useState } from "react";
import Patient from "../../model/Patient";
import { modifyPatient } from "../../services";
import { useCustomMutation, useCustomToast } from "../../utils";
import { PatientModifyPayload, OrthancResponse } from "../../utils/types";
import PatientEditForm from './PatientEditForm';
import { Modal } from "../../ui";

type EditPatientProps = {
    patient: Patient;
    onEditPatient: (patient: Patient) => void;
    onClose: () => void;
    show: boolean;
}

const EditPatient: React.FC<EditPatientProps> = ({ patient, onEditPatient, onClose, show }) => {
    const { toastError } = useCustomToast();
    const [jobId, setJobId] = useState<string | null>(null);

    const { mutateAsync: mutatePatient } = useCustomMutation<OrthancResponse, { id: string, payload: PatientModifyPayload }>(
        ({ id, payload }) => modifyPatient(id, payload),
        [['jobs']],
        {
            onSuccess: async (data) => {
                setJobId(data.id);
            },
            onError: () => {
                toastError(`Failed to update patient`);
            }
        }
    );

    const handleSubmit = ({ id, payload }: { id: string; payload: PatientModifyPayload }) => {
        mutatePatient({ id, payload });
    };

    const handleJobCompletion = (job: string) => {
        if (job === "Success") {
            onEditPatient(patient);
            onClose();
        } else if (job === "Failure") {
            toastError(`Failed to update Study `);
        }
    };

    return (
        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose}> Edit patient </Modal.Header>
            <Modal.Body>
                <PatientEditForm patient={patient} jobId={jobId} onSubmit={handleSubmit} onJobCompleted={handleJobCompletion} />
            </Modal.Body>
        </Modal>
    );
};

export default EditPatient;
