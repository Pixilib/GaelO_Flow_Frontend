import React from "react";
import { Accordion, DeleteButton, EditButton } from "../../ui";
import Patient from "../../model/Patient";
import StudiesManager from "../StudiesManager";

type AccordionPatientProps = {
    patient: Patient;
    onEditPatient: (patient: Patient) => void;
    onDeletePatient: (patientId: string) => void;
};

const AccordionPatient: React.FC<AccordionPatientProps> = ({ patient, onEditPatient, onDeletePatient }) => {
    return (
        <Accordion
            summary={
                <div className="flex items-center justify-between w-full lg:gap-x-10">
                    <span className="text-sm font-medium text-primary lg:text-lg">Patient ID: {patient.patientId}</span>
                    <span className="text-sm">Name: {patient.patientName}</span>
                    <span className="text-sm">Nb of Studies: {patient.getStudies().length}</span>
                    <div className="flex space-x-7">
                        <EditButton onClick={() => onEditPatient(patient)} />
                        <DeleteButton onClick={() => onDeletePatient(patient.id)} />
                    </div>
                </div>
            }
            variant="primary"
            className="w-full rounded-2xl"
        >
            <StudiesManager patient={patient} />
        </Accordion>
    );
};

export default AccordionPatient;