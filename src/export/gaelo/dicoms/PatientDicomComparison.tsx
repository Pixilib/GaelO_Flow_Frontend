import { useContext, useMemo } from "react"

import { Badge, Spinner } from "../../../ui"
import { Study, useCustomQuery } from "../../../utils"

import GaelOContext from "../context/GaelOContext"
import { getPatient } from "../../../services/gaelo"
import { getStudy } from "../../../services/orthanc"
import { formatDate } from "../../../utils/export"

type PatientDicomComparisonProps = {
    studyOrthancId: string
    patientId: string
}

const PatientDicomComparison = ({ studyOrthancId, patientId }: PatientDicomComparisonProps) => {

    const { studyName, token, role } = useContext(GaelOContext);

    const { data: study, isPending: isPendingStudy } = useCustomQuery<Study>(
        ['studies', studyOrthancId],
        () => getStudy(studyOrthancId)
    )

    const { data: patient, isPending: isPendingPatient } = useCustomQuery(
        ['gaelo', 'patient', patientId],
        () => getPatient(token, studyName, patientId, role)
    )

    const firstnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags.patientName?.split('^')?.[1]?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.firstname?.toUpperCase() ?? "N/A"
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const lastnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags.patientName?.split('^')?.[0]?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.lastname?.toUpperCase() ?? "N/A"
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const dobCheck = useMemo(() => {
        const dicomDob = study?.patientMainDicomTags.patientBirthDate ?? "ND-ND-ND"
        const gaeloBirthDay = patient?.birthDay ?? 'ND'
        const gaeloBirthMonth = patient?.birthMonth ?? 'ND'
        const gaeloBirthYear = patient?.birthYear ?? 'ND'
        const gaelODob = [gaeloBirthYear, gaeloBirthMonth, gaeloBirthDay].join('-')
        return {
            gaelo: gaelODob,
            dicom: dicomDob,
            pass: gaelODob == dicomDob
        }
    }, [study, patient])

    if (isPendingStudy || isPendingPatient) return <Spinner />

    return (
        <div className="flex justify-around">
            <Badge variant={'default'} className="flex flex-col min-w-[150px]">
                <span className="font-bold">Firstname</span>
                <span>GaelO: {firstnameCheck.gaelo ?? "N/A"}</span>
                <span>Dicom: {firstnameCheck.dicom}</span>
            </Badge>
            <Badge variant={'default'} className="flex flex-col min-w-[150px]">
                <span className="font-bold">Lastname</span>
                <span>GaelO: {lastnameCheck?.gaelo ?? "N/A"}</span>
                <span>Dicom: {lastnameCheck.dicom}</span>
            </Badge>
            <Badge variant={'default'} className="flex flex-col min-w-[150px]">
                <span className="font-bold">Date Of Birth</span>
                <span>GaelO: {dobCheck.gaelo}</span>
                <span>Dicom: {formatDate(dobCheck.dicom)}</span>
            </Badge>
        </div>
    )

}

export default PatientDicomComparison