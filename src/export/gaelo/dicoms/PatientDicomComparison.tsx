import { useContext, useEffect, useMemo, useState } from "react"

import { Button, Spinner } from "../../../ui"
import { Colors, Study, useCustomQuery } from "../../../utils"

import GaelOContext from "../context/GaelOContext"
import { getPatient } from "../../../services/gaelo"
import { getStudy } from "../../../services/orthanc"
import { GaeloIcon } from "../../../assets"
import { formatDate } from "../../../utils/export"

type PatientDicomComparisonProps = {
    studyOrthancId: string
    patientId: string
    onAuthorizedToSendChange: (value: boolean) => void
}

const styleValidate = 'bg-green-100 border-green-300 dark:bg-green-200/30 dark:border-green-300/30';
const styleUnValidated = 'bg-red-100 border-red-300 dark:bg-red-200/30 dark:border-red-300/30';

const PatientDicomComparison = ({ studyOrthancId, patientId, onAuthorizedToSendChange }: PatientDicomComparisonProps) => {
    const { studyName, token, role } = useContext(GaelOContext);

    const [forceFirstname, setForceFirstname] = useState(false)
    const [forceLastname, setForceLastname] = useState(false)
    const [forceDob, setForceDob] = useState(false)

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

    useEffect(() => {
        onAuthorizedToSendChange(
            (firstnameCheck.pass || forceFirstname) &&
            (lastnameCheck.pass || forceLastname) &&
            (dobCheck.pass || forceDob)
        )
    }, [dobCheck, firstnameCheck, lastnameCheck, forceDob, forceFirstname, forceLastname])

    if (isPendingStudy || isPendingPatient) return <Spinner />

    return (
        <div className="flex flex-col dark:text-white">
            <div className={"flex flex-row font-bold bg-green-100 rounded-t-lg items-center p-1 pl-3 pr-3 border-t " + styleValidate}>
                <p className="w-full">Tag</p>
                <p className="w-full">DICOM</p>
                <div className="w-full">
                    <GaeloIcon />
                </div>
                <p className="w-full">Force</p>
            </div>
            <div className={`flex flex-row items-center p-1 pl-3 pr-3 border-b border-t ${(firstnameCheck.pass || forceFirstname) ? styleValidate : styleUnValidated}`}>
                <p className="w-full font-semibold">Firstname</p>
                <p className="w-full">{firstnameCheck.dicom}</p>
                <p className="w-full">{firstnameCheck.gaelo}</p>
                <div className="w-full">
                    {!firstnameCheck.pass &&
                        <Button
                            className="h-7"
                            color={forceFirstname ? Colors.danger : Colors.success}
                            onClick={() => setForceFirstname(!forceFirstname)}
                            children={
                                <p className="text-sm">{forceFirstname ? "Consider" : "Ignore"}</p>
                            }
                        />
                    }
                </div>
            </div>
            <div className={`flex flex-row items-center p-1 pl-3 pr-3 border-b ${(lastnameCheck.pass || forceLastname) ? styleValidate : styleUnValidated}`}>
                <p className="w-full font-semibold">Lastname</p>
                <p className="w-full">{lastnameCheck.dicom}</p>
                <p className="w-full">{lastnameCheck.gaelo}</p>
                <div className="w-full">
                    {!lastnameCheck.pass &&
                        <Button
                            className="h-7"
                            color={forceLastname ? Colors.danger : Colors.success}
                            onClick={() => setForceLastname(!forceLastname)}
                            children={
                                <p className="text-sm">{forceLastname ? "Consider" : "Ignore"}</p>
                            }
                        />
                    }
                </div>
            </div>
            <div className={`flex flex-row items-center rounded-b-lg p-1 pl-3 pr-3 border-b ${(dobCheck.pass || forceDob) ? styleValidate : styleUnValidated}`}>
                <p className="w-full font-semibold">Date Of Birth</p>
                <p className="w-full">{dobCheck.dicom}</p>
                <p className="w-full">{dobCheck.gaelo}</p>
                <div className="w-full">
                    {!dobCheck.pass &&
                        <Button
                            className="h-7"
                            color={forceDob ? Colors.danger : Colors.success}
                            onClick={() => setForceDob(!forceDob)}
                            children={
                                <p className="text-sm">{forceDob ? "Consider" : "Ignore"}</p>
                            }
                        />
                    }
                </div>
            </div>
        </div>
    )

}

export default PatientDicomComparison