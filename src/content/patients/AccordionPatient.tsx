import React, { useState } from "react";

import { Accordion, DeleteButton, DownloadButton, EditButton } from "../../ui";

import Patient from "../../model/Patient";

import StudyRoot from "../studies/StudyRoot";
import SeriesRoot from "../series/SeriesRoot";
import { AccordionHeader } from "../../ui/Accordion";
import { exportRessource } from "../../services/export";
import { useCustomToast } from "../../utils";

type AccordionPatientProps = {
    patient: Patient;
    onEditPatient: (patient: Patient) => void;
    onStudyUpdated: (patient: Patient) => void;
    onDeletePatient: (patient: Patient) => void;
};

const AccordionPatient: React.FC<AccordionPatientProps> = ({ patient, onEditPatient, onDeletePatient, onStudyUpdated }) => {
    const { toastSuccess, updateExistingToast } = useCustomToast()
    const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

    const handleStudySelected = (studyId: string) => {
        setSelectedStudyId(studyId);
    };

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
        event.stopPropagation();
        onEditPatient(patient);
    }

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
        event.stopPropagation();
        onDeletePatient(patient);
    }

    const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
        event.stopPropagation();
        const id = toastSuccess("Download started")
        exportRessource("patients", patient.id, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"))
    }

    return (
        <>
            <Accordion
                header={
                    <AccordionHeader className="hover:bg-primary-active group">
                        <div className="grid items-center justify-between w-full grid-cols-4 lg:gap-x-10 ">
                            <span className="text-sm font-medium text-primary group-hover:text-white lg:text-lg">Patient ID: {patient.patientId}</span>
                            <span className="text-sm group-hover:text-white ">Name: {patient.patientName}</span>
                            <span className="text-sm group-hover:text-white">Nb of Studies: {patient.getStudies().length}</span>
                            <div className="flex justify-end w-full space-x-7">
                                <EditButton onClick={handleEditClick} />
                                <DownloadButton onClick={handleSaveClick} />
                                <DeleteButton onClick={handleDeleteClick} />
                            </div>
                        </div>
                    </AccordionHeader>

                }
                className="w-full rounded-2xl"
            >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className={`${!selectedStudyId ? 'lg:col-span-2' : ''}`}>
                        <StudyRoot
                            patient={patient}
                            onStudyUpdated={() => onStudyUpdated(patient)}
                            onStudySelected={handleStudySelected}
                        />
                    </div>
                    {selectedStudyId && (
                        <div>
                            <SeriesRoot
                                studyId={selectedStudyId}
                            />
                        </div>
                    )}
                </div>
            </Accordion>
        </>
    );
};

export default AccordionPatient;
