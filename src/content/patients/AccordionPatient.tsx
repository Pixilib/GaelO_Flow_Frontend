import React, { useEffect, useState } from "react";

import { Accordion, CheckBox, DeleteButton, DownloadButton, EditButton } from "../../ui";

import Patient from "../../model/Patient";

import StudyRoot from "../studies/StudyRoot";
import SeriesRoot from "../series/SeriesRoot";
import { AccordionHeader } from "../../ui/Accordion";
import { exportRessource } from "../../services/export";
import { useCustomToast } from "../../utils";

type AccordionPatientProps = {
    patient: Patient;
    onPatientSelectionChange: (selected: boolean, patient: Patient) => void
    onEditPatient: (patient: Patient) => void;
    onStudyUpdated: (patient: Patient) => void;
    onDeletePatient: (patient: Patient) => void;
    selectedStudies: { [studyId: string]: boolean }
    onSelectedStudyChange: (selectedState: { [studyId: string]: boolean }) => void
};

const AccordionPatient = ({ patient, onPatientSelectionChange, onEditPatient, onDeletePatient, onStudyUpdated, selectedStudies, onSelectedStudyChange }: AccordionPatientProps) => {

    const { toastSuccess, updateExistingToast } = useCustomToast()
    const [selected, setSelected] = useState(false)
    const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);


    useEffect(() => {
        onPatientSelectionChange(selected, patient)
    }, [selected])

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

    const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
        event.stopPropagation();
        const id = toastSuccess("Download started")
        exportRessource("patients", patient.id, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"))
    }

    return (
        <>
            <Accordion
                header={
                    <AccordionHeader className=" hover:bg-primary-active group">
                        <CheckBox bordered={false}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => setSelected(event.target.checked)}
                            checked={selected} />
                        <div className="grid items-center justify-between w-full grid-cols-4 ml-5 lg:gap-x-10 ">
                            <span className="text-sm font-medium text-gray-600 group-hover:text-white">Patient ID: {patient.patientId}</span>
                            <span className="text-sm font-medium group-hover:text-white ">Name: {patient.patientName}</span>
                            <span className="text-sm font-medium group-hover:text-white">Nb of Studies: {patient.getStudies().length}</span>
                            <div className="flex justify-end w-full space-x-7">
                                <EditButton
                                    onClick={handleEditClick}
                                    className="group-hover:fill-white" 
                                />
                                <DownloadButton onClick={handleDownloadClick} />
                                <DeleteButton onClick={handleDeleteClick} />
                            </div>
                        </div>
                    </AccordionHeader>

                }
                className="w-full rounded-2xl"
            >
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className={`${!selectedStudyId ? 'lg:col-span-2' : ''}`}>
                        <StudyRoot
                            patient={patient}
                            onStudyUpdated={() => onStudyUpdated(patient)}
                            onStudySelected={handleStudySelected}
                            selectedStudies={selectedStudies}
                            onSelectedStudyChange={onSelectedStudyChange}
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
