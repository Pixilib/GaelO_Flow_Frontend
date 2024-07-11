import React from "react";
import Model from "../model/Model";
import { Accordion, DeleteButton } from "../ui";
import StudiesTable from "./StudiesTable";
import EditButton from '../ui/EditButton';

type OrthancResultsProps = {
    model: Model | null;
    onEdit?: (id: string | null) => void;
    onDelete?: (id: string | null) => void;
};

const OrthancResults: React.FC<OrthancResultsProps> = ({ model, onEdit, onDelete }) => {
    console.log(model, model?.patients, model?.getStudies ?? []);
    const handleOnRowClick = (studyInstanceUID: string, originAET: string) => {
        console.log(studyInstanceUID, originAET);
    }
    return (
        <div className="w-full">
            {model && model.patients.map((patient, index) => (
                <Accordion
                    key={index}
                    summary={
                        <div className="flex items-center justify-between w-full gap-x-10">
                            <span className="text-lg font-medium">Patient ID: {patient.patientId}</span>
                            <span className="text-sm">Name: {patient.patientName}</span>
                            <div className="flex space-x-7">
                                <EditButton onClick={() => onEdit && onEdit(patient.patientId)} />
                                <DeleteButton onClick={() => onDelete && onDelete(patient.patientId)} />
                            </div>
                        </div>
                    }
                    variant="primary"
                    className="w-full hover:bg-almond"
                >
                    <StudiesTable studies={patient.getStudies()} onRowClick={handleOnRowClick} />
                </Accordion>
            ))}
        </div>
    );
};

export default OrthancResults;
