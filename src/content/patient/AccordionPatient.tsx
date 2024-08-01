import React, { useState } from "react";

import { deletePatient, useConfirm } from "../../services";
import { useCustomMutation, useCustomToast } from "../../utils";
import { Accordion, DeleteButton, EditButton } from "../../ui";

import Patient from "../../model/Patient";

import EditPatient from "./EditPatient";
import StudyRoot from "../studies/StudyRoot";
import SeriesRoot from "../series/SeriesRoot";

type AccordionPatientProps = {
    patient: Patient;
    onPatientEdited: () => void;
    onPatientDeleted: () => void;
};

const AccordionPatient: React.FC<AccordionPatientProps> = ({ patient, onPatientEdited, onPatientDeleted }) => {
    const { toastSuccess, toastError } = useCustomToast();
    const { confirm } = useConfirm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

    const { mutateAsync: mutateDeletePatient } = useCustomMutation<void, string>(
        (patientId) => deletePatient(patientId),
        [['jobs']],
        {
            onSuccess: async () => {
                toastSuccess("Patient deleted successfully");
                onPatientDeleted();
            },
            onError: (error: any) => {
                toastError(`Failed to delete patient ${error}`);
            }
        }
    );
    const handleDeletePatient = async () => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this patient:
                <span className="text-xl not-italic font-bold text-primary">{patient.id} {patient.patientName} ?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeletePatient(patient.id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePatientUpdate = () => {
        onPatientEdited();
        closeModal();
    };

    const handleStudySelected = (studyId: string) => {
        setSelectedStudyId(studyId);
    };
    return (
        <>
            {isModalOpen && (
                <EditPatient
                    patient={patient}
                    onEditPatient={handlePatientUpdate}
                    onClose={closeModal}
                    show={isModalOpen}
                />
            )}
            <Accordion
                summary={
                    <div className="flex items-center justify-between w-full lg:gap-x-10">
                        <span className="text-sm font-medium text-primary lg:text-lg">Patient ID: {patient.patientId}</span>
                        <span className="text-sm">Name: {patient.patientName}</span>
                        <span className="text-sm">Nb of Studies: {patient.getStudies().length}</span>
                        <div className="flex space-x-7">
                            <EditButton onClick={() => setIsModalOpen(true)} />
                            <DeleteButton onClick={handleDeletePatient} />
                        </div>
                    </div>
                }
                variant="primary"
                className="w-full rounded-2xl"
            >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className={`${!selectedStudyId ? 'lg:col-span-2' : ''}`}>
                        <StudyRoot
                            patient={patient}
                            onStudyUpdated={onPatientEdited}
                            onStudySelected={handleStudySelected}
                        />
                    </div>
                    {selectedStudyId && (
                        <div>
                            <SeriesRoot
                                studyId={selectedStudyId}
                                onSeriesUpdate={onPatientEdited}
                            />
                        </div>
                    )}
                </div>
            </Accordion>
        </>
    );
};

export default AccordionPatient;


