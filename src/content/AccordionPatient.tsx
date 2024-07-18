import { useState } from "react";
import { Accordion, DeleteButton, EditButton } from "../ui";
import { Series } from "../utils/types";
import { useCustomQuery } from "../utils";
import { getSeriesOfStudy } from "../services/orthanc";
import Patient from "../model/Patient";
import Study from "../model/Study";
import StudyTable from "./StudyTable";
import SeriesTable from "../content/SeriesTable";

type AccordionPatientProps = {
    patient: Patient;
    onEditPatient: (patient: Patient) => void;
    onDeletePatient: (patientId: string) => void;
};

const AccordionPatient = ({ patient, onEditPatient, onDeletePatient }: AccordionPatientProps) => {
    const [currentStudyId, setCurrentStudyId] = useState<string | null>(null);

    const { data: seriesByStudy, isLoading, isError } = useCustomQuery<Series[]>(
        ["studies", currentStudyId as string, "series"],
        () => getSeriesOfStudy(currentStudyId as string),
        {
            enabled: !!currentStudyId,
            onSuccess: data => {
                console.log("Fetched series:", data);
            },
            onError: error => {
                console.error("Error fetching series:", error);
            }
        }
    );

    const handleOnRowClick = (row: Study) => {
        setCurrentStudyId(row.id);
    };

    return (
        <Accordion
            summary={
                <div className="flex items-center justify-between w-full lg:gap-x-10">
                    <span className="text-sm font-medium text-primary lg:text-lg">Patient ID: {patient.patientId}</span>
                    <span className="text-sm">Name: {patient.patientName}</span>
                    <span className="text-sm">Nb of Studies: {patient.getStudies().length}</span>
                    <div className="flex space-x-7">
                        <EditButton onClick={() => onEditPatient(patient)} />
                        <DeleteButton 
                            onClick={() => {onDeletePatient(patient.id)}} 
                        />
                    </div>
                </div>
            }
            variant="primary"
            className="w-full rounded-2xl"
        >
            {isLoading && <p>Loading series...</p>}
            {isError && <p>Error loading series.</p>}
            <div className={`${currentStudyId ? 'grid grid-cols-1 gap-y-3 xl:grid-cols-2 xl:gap-x-2' : 'grid grid-cols-1'}`}>
                <StudyTable studies={patient.getStudies()} onRowClick={handleOnRowClick} />
                {seriesByStudy && <SeriesTable series={seriesByStudy} />}
            </div>
        </Accordion>
    );
};

export default AccordionPatient;
