import { useContext, useMemo } from "react"

import { Badge, Spinner } from "../../../ui"
import { Study, useCustomQuery } from "../../../utils"

import GaelOContext from "../context/GaelOContext"
import { getPatient } from "../../../services/gaelo"
import { getStudy } from "../../../services/orthanc"
import { GaeloIcon } from "../../../assets"
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
        const initalGaelO = patient?.firstname?.toUpperCase() === "" ? "N/A" : patient?.firstname?.toUpperCase()
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const lastnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags.patientName?.split('^')?.[0]?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.lastname?.toUpperCase() === "" ? "N/A" : patient?.lastname?.toUpperCase()
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const dobCheck = useMemo(() => {
        let dicomDob = study?.patientMainDicomTags.patientBirthDate ?? "ND-ND-ND"
        if (dicomDob !== "ND-ND-ND")
            dicomDob = formatDate(dicomDob)
        const formatWithLeadingZero = (value: string | number | undefined): string =>
            value != null ? value.toString().padStart(2, '0') : 'ND';
        const gaeloBirthDay = patient?.birthDay != null ? formatWithLeadingZero(patient.birthDay) : 'ND';
        const gaeloBirthMonth = patient?.birthMonth != null ? formatWithLeadingZero(patient.birthMonth) : 'ND';
        const gaeloBirthYear = patient?.birthYear ?? 'ND';

        const gaelODob = [gaeloBirthYear, gaeloBirthMonth, gaeloBirthDay].join('-');
        return {
            gaelo: gaelODob,
            dicom: dicomDob,
            pass: gaelODob == dicomDob
        }
    }, [study, patient])

    if (isPendingStudy || isPendingPatient) return <Spinner />

    return (
        <div className="flex flex-col">
            <div className="flex flex-row font-bold bg-green-100 items-center p-1 pl-3 pr-3 border-t border-green-300">
                <p className="w-full">Tag</p>
                <p className="w-full">DICOM</p>
                <div className="w-full">
                    <GaeloIcon />
                </div>
            </div>
            <div className={`flex flex-row items-center p-1 pl-3 pr-3 border-b border-t ${firstnameCheck.pass ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                <p className="w-full">Firstname</p>
                <p className="w-full">{firstnameCheck.dicom}</p>
                <p className="w-full">{firstnameCheck.gaelo}</p>
            </div>
            <div className={`flex flex-row items-center p-1 pl-3 pr-3 border-b ${lastnameCheck.pass ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                <p className="w-full">Lastname</p>
                <p className="w-full">{lastnameCheck.dicom}</p>
                <p className="w-full">{lastnameCheck.gaelo}</p>
            </div>
            <div className={`flex flex-row items-center p-1 pl-3 pr-3 border-b ${dobCheck.pass ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                <p className="w-full">Date Of Birth</p>
                <p className="w-full">{dobCheck.dicom}</p>
                <p className="w-full">{dobCheck.gaelo}</p>
            </div>
        </div>
    )

}

export default PatientDicomComparison