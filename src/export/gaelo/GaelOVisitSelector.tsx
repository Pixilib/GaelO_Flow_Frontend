import { useContext, useMemo, useState } from "react"
import { getVisitsTree } from "../../services/gaelo"
import { useCustomQuery } from "../../utils"
import GaelOContext from "./context/GaelOContext"
import { Spinner } from "../../ui"
import PatientTable from "./patients/PatientTable"

const GaelOVisitSelector = () => {

    const { studyName, token, userId, role } = useContext(GaelOContext)

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

    const { data: visitTree, isPending } = useCustomQuery(
        ['gaelo', 'study', studyName, role],
        () => getVisitsTree(token, studyName, role)
    )

    const patients = useMemo(() => {
        if (!visitTree) return []
        return Object.values(visitTree.patients)
    }, [visitTree])

    const handlePatientClick = (patientId: string) => {
        setSelectedPatientId(patientId)
    }

    const visitsOfPatient = useMemo(() => {
        if (!visitTree) return []
        const visitsOfPatient = Object.values(visitTree.visits).filter((visit: any) => visit.patientId === selectedPatientId)
        console.log(visitsOfPatient)
    }, [selectedPatientId])

    if (isPending) return <Spinner />

    return (
        <div className="flex flex-col gap-3">
            <div>Patients : </div>
            <PatientTable patients={patients} selectedPatientId={selectedPatientId} onRowClick={handlePatientClick} />
            <div>Visits : </div>
        </div>
    )
}

export default GaelOVisitSelector