import { useContext, useEffect, useMemo, useState } from "react"

import { Button, Spinner } from "../../../ui"
import { Colors, Study, useCustomQuery } from "../../../utils"

import GaelOContext from "../context/GaelOContext"
import { getPatient } from "../../../services/gaelo"
import { getSeriesOfStudy, getStudy } from "../../../services/orthanc"
import { GaeloIcon } from "../../../assets"
import { formatDate } from "../../../utils/export"
import DicomComparaisonLines from "./DicomComparaisonLines"

type PatientDicomComparisonProps = {
    studyOrthancId: string
    patientId: string
    onAuthorizedToSendChange: (value: boolean) => void
    visit: any
}

const PatientDicomComparison = ({ studyOrthancId, patientId, onAuthorizedToSendChange, visit }: PatientDicomComparisonProps) => {
    const { studyName, token, role } = useContext(GaelOContext);

    const [forceAcquisitionDateCheck, setForceAcquisitionDateCheck] = useState(false)
    const [forceFirstname, setForceFirstname] = useState(false)
    const [forceLastname, setForceLastname] = useState(false)
    const [forceDob, setForceDob] = useState(false)
    const [forceSex, setForceSex] = useState(false)
    const [forceModality, setForceModality] = useState(false)

    const { data: study, isPending: isPendingStudy } = useCustomQuery<Study>(
        ['studies', studyOrthancId],
        () => getStudy(studyOrthancId)
    )

    const { data: patient, isPending: isPendingPatient } = useCustomQuery(
        ['gaelo', 'patient', patientId],
        () => getPatient(token, studyName, patientId, role)
    )

    const { data: listOfSeries } = useCustomQuery(
        ['orthanc', 'study', studyOrthancId, 'series'],
        () => getSeriesOfStudy(studyOrthancId)
    )

    const firstnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags?.patientName?.split('^')?.[1]?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.firstname?.toUpperCase() === "" ? "N/A" : patient?.firstname?.toUpperCase()
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const lastnameCheck = useMemo(() => {
        const initialDicom = study?.patientMainDicomTags?.patientName?.split('^')?.[0]?.[0]?.toUpperCase() ?? "N/A"
        const initalGaelO = patient?.lastname?.toUpperCase() === "" ? "N/A" : patient?.lastname?.toUpperCase()
        return {
            gaelo: initalGaelO,
            dicom: initialDicom,
            pass: initialDicom === initalGaelO
        }
    }, [study, patient])

    const dobCheck = useMemo(() => {
        let dicomDob = study?.patientMainDicomTags?.patientBirthDate ?? "ND-ND-ND"
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

    const sexCheck = useMemo(() => {
        let dicomSex = study?.patientMainDicomTags?.patientSex ?? "N/A";
        let gaeloSex = patient?.gender ?? "N/A";

        return {
            gaelo: gaeloSex,
            dicom: dicomSex,
            pass: dicomSex === gaeloSex
        }
    }, [study, patient])

    const acquisitionDateCheck = useMemo(() => {
        let dicomAcquisitionDate = study?.mainDicomTags?.studyDate ?? "ND-ND-ND";
        if (dicomAcquisitionDate !== "ND-ND-ND")
            dicomAcquisitionDate = formatDate(dicomAcquisitionDate);
        const gaeloAcquisitionDate = visit?.visitDate?.slice(0, 10) ?? "ND-ND-ND";
        return {
            gaelo: gaeloAcquisitionDate,
            dicom: dicomAcquisitionDate,
            pass: dicomAcquisitionDate === gaeloAcquisitionDate
        }
    }, [study, patient])

    const modalityCheck = useMemo(() => {
        let dicomModality = listOfSeries?.[0]?.mainDicomTags?.modality ?? "N/A";
        const gaeloModality = visit?.visitGroup?.modality ?? "N/A";
        for (const series of listOfSeries ?? []) {
            if (series.mainDicomTags?.modality === gaeloModality) {
                dicomModality = series.mainDicomTags?.modality ?? "N/A";
                break;
            }
        }
        return {
            gaelo: gaeloModality,
            dicom: dicomModality,
            pass: dicomModality === gaeloModality
        }
    }, [study, patient])

    useEffect(() => {
        onAuthorizedToSendChange(
            (firstnameCheck.pass || forceFirstname) &&
            (lastnameCheck.pass || forceLastname) &&
            (dobCheck.pass || forceDob) &&
            (sexCheck.pass || forceSex) &&
            (acquisitionDateCheck.pass || forceAcquisitionDateCheck) &&
            (modalityCheck.pass || forceModality)
        )
    }, [
        dobCheck, forceDob,
        firstnameCheck, forceFirstname,
        lastnameCheck, forceLastname,
        sexCheck, forceSex,
        acquisitionDateCheck, forceAcquisitionDateCheck,
        modalityCheck, forceModality
       ]
    )

    if (isPendingStudy || isPendingPatient) return <Spinner />

    return (
        <div className="flex flex-col dark:text-white">
            <div className={"flex flex-row font-bold rounded-t-lg items-center p-1 pl-3 pr-3 border-t bg-green-100 border-green-300 dark:bg-green-200/30 dark:border-green-300/30"}>
                <p className="w-full">Tag</p>
                <p className="w-full">DICOM</p>
                <div className="w-full">
                    <GaeloIcon />
                </div>
                <p className="w-full">Force</p>
            </div>
            <DicomComparaisonLines
                name="Firstname"
                itemCheck={firstnameCheck}
                itemForce={forceFirstname}
                onItemForceChange={setForceFirstname}
            />
            <DicomComparaisonLines
                name="Lastname"
                itemCheck={lastnameCheck}
                itemForce={forceLastname}
                onItemForceChange={setForceLastname}
            />
            <DicomComparaisonLines
                name="Date Of Birth"
                itemCheck={dobCheck}
                itemForce={forceDob}
                onItemForceChange={setForceDob}
            />
            <DicomComparaisonLines
                name="Sex"
                itemCheck={sexCheck}
                itemForce={forceSex}
                onItemForceChange={setForceSex}
            />
            <DicomComparaisonLines
                name="Visit Date"
                itemCheck={acquisitionDateCheck}
                itemForce={forceAcquisitionDateCheck}
                onItemForceChange={setForceAcquisitionDateCheck}
            />
            <DicomComparaisonLines
                name="Modality"
                itemCheck={modalityCheck}
                itemForce={forceModality}
                onItemForceChange={setForceModality}
                className="rounded-b-lg"
            />
        </div>
    )
}

export default PatientDicomComparison