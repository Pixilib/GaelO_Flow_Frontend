import { useState } from "react"
import { Accordion, DeleteButton, EditButton } from "../ui"
import { Series } from "../utils/types"
import { useCustomQuery } from "../utils"
import { getSeriesOfStudy } from "../services/orthanc"
import Patient from "../model/Patient"
import Study from "../model/Study"

type AccordionPatientProps = {
    patient: Patient
    onEditPatient: (patientId: string) => void
    onDeletePatient: (patientId: string) => void
}
const AccordionPatient = ({ patient, onEditPatient, onDeletePatient }: AccordionPatientProps) => {

    const [currentStudyId, setCurrentStudyId] = useState<string | null>(null)

    const { data: series } = useCustomQuery<Series[]>(
        ['studies', currentStudyId as string, 'series'],
        () => getSeriesOfStudy(currentStudyId as string),
        {
            enabled: currentStudyId != null
        }

    )

    const handleOnRowClick = (row: Study) => {
        setCurrentStudyId(row.id)
    }

    return (
        <Accordion
            summary={
                <div className="flex items-center justify-between w-full gap-x-10">
                    <span className="text-lg font-medium">Patient ID: {patient.patientId}</span>
                    <span className="text-sm">Name: {patient.patientName}</span>
                    <div className="flex space-x-7">
                        <EditButton onClick={() => onEditPatient(patient.id)} />
                        <DeleteButton onClick={() => onDeletePatient(patient.id)} />
                    </div>
                </div>
            }
            variant="primary"
            className="w-full hover:bg-almond"
        >
            <StudyTable studies={patient.getStudies()} onRowClick={handleOnRowClick} />
            <SeriesTable series={series ?? []} />
        </Accordion>
    )
}

export default AccordionPatient