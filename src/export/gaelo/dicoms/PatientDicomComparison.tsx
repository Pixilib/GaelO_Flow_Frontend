import { useContext, useMemo } from "react"

import { Badge, Spinner } from "../../../ui"
import { Study, useCustomQuery } from "../../../utils"

import GaelOContext from "../context/GaelOContext"
import { getPatient } from "../../../services/gaelo"
import { getStudy } from "../../../services/orthanc"

type PatientDicomComparisonProps = {
    studyOrthancId: string
    patientId: string
}
export const PatientDicomComparison = ({ studyOrthancId, patientId }: PatientDicomComparisonProps) => {

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
        const initialDicom = study?.patientMainDicomTags.patientName?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.firstname?.toUpperCase() ?? "N/A"
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const lastnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags.patientName?.split('^')?.[1]?.[0]?.toUpperCase() ?? "N/A"
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
        <div className="flex gap-3">
            <Badge variant={'default'}>
                Firstname :<br />
                <span>
                    {"GaelO: " + firstnameCheck.gaelo + " Dicom: " + firstnameCheck.dicom}
                </span>
            </Badge>
            <Badge variant={'default'}>
                Lastname :<br />
                <span>
                    {"GaelO: " + lastnameCheck.gaelo + " Dicom: " + lastnameCheck.dicom}
                </span>
            </Badge>
            <Badge variant={'default'}>
                Date Of Birth :<br />
                <span>
                    {"GaelO: " + dobCheck.gaelo + " Dicom: " + dobCheck.dicom}
                </span>
            </Badge>
        </div>
    )

}