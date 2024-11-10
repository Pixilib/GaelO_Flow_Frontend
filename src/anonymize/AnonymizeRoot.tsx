import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter, Button, SelectInput, Input, CheckBox } from "../ui";
import { Colors, useCustomMutation } from "../utils";
import PatientTable from "./PatientTable";
import StudyTable from "./StudyTable";
import { RootState } from "../store";
import { useMemo, useState } from "react";
import {
    flushAnonymizeList,
    removeStudyFromAnonymizeList,
    updateAnonymizationProfile,
    updateAnonymizePatientValue,
    updateAnonymizeStudyValue,
} from "../reducers/AnonymizeSlice";
import { Anon, Empty } from "../icons";
import AutoFill from "../icons/AutofIll";
import { AnonItem } from "../utils/types";
import { createAnonymizeQueue } from "../services/queues";
import AnonQueues from "./AnonQueues";
import DropdownButton from "../ui/menu/DropDownButton";

const profileOptions = [
    { value: "Default", label: "Default" },
    { value: "Full", label: "Full" },
];

const AnonymizeRoot = () => {
    const dispatch = useDispatch();
    const anonList = useSelector((state: RootState) => state.anonymize);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [anonJobId, setAnonJobId] = useState<string | null>(null);

    const { mutate: mutateCreateAnonymizeQueue } = useCustomMutation(
        ({ anonItems }) => createAnonymizeQueue(anonItems),
        [['queue', 'anonymize']],
        {
            onSuccess: (jobId) => {
                setAnonJobId(jobId);
            },
        }
    );

    const patients = useMemo(() => Object.values(anonList.patients), [anonList]);
    const studies = useMemo(() => {
        if (!selectedPatientId) return [];
        return Object.values(anonList.studies).filter(
            (study) => study.originalStudy.parentPatient === selectedPatientId
        );
    }, [anonList, selectedPatientId]);

    const handleAutoFill = () => {
        patients.forEach((patient) => {
            dispatch(
                updateAnonymizePatientValue({
                    patientId: patient.originalPatient.id,
                    newPatientName: `Patient_${patient.originalPatient.id}`,
                    newPatientId: `ID_${patient.originalPatient.id}`,
                })
            );
        });

        studies.forEach((study) => {
            dispatch(
                updateAnonymizeStudyValue({
                    studyId: study.originalStudy.id,
                    newStudyDescription: `Study_${study.originalStudy.id}`,
                    newAccessionNumber: `Acc_${study.originalStudy.id}`,
                })
            );
        });
    };

    const onChangeStudy = (studyId: string, key: string, value: string) => {
        dispatch(updateAnonymizeStudyValue({ studyId, [key]: value }));
    };

    const onRemoveStudy = (studyId: string) => {
        dispatch(removeStudyFromAnonymizeList({ studyId }));
    };

    const onChangePatient = (patientId: string, key: string, value: string) => {
        dispatch(updateAnonymizePatientValue({ patientId, [key]: value }));
    };

    const onRemovePatient = (patientId: string) => {
        studies
            .filter((study) => study.originalStudy.parentPatient === patientId)
            .forEach((study) => {
                dispatch(removeStudyFromAnonymizeList({ studyId: study.originalStudy.id }));
            });
    };

    const onChangeProfile = (option: { value: string }) => {
        dispatch(updateAnonymizationProfile({ anonymizationProfile: option.value }));
    };

    const handleAnonymizeStart = () => {
        const anonItems: AnonItem[] = Object.values(anonList.studies).map((study) => ({
            OrthancStudyID: study.originalStudy.id,
            Profile: anonList.anonymizationProfile,
            NewPatientID: study.newPatientId,
            NewPatientName: study.newPatientName,
            NewStudyDescription: study.newStudyDescription,
            NewAccessionNumber: study.newAccessionNumber,
        }));
        mutateCreateAnonymizeQueue({ anonItems });
    };

    return (
        <>
            <CardHeader color={Colors.primary}>
                <div className="flex flex-col items-center w-full sm:flex-row">
                    <div className="w-full mb-2 text-lg font-bold text-center sm:w-4/5 sm:mb-0">
                        Anonymize resources
                    </div>
                    <div className="flex justify-end w-full p-3 sm:w-1/5">
                        <DropdownButton
                            row={null}
                            options={[]}
                            buttonText={
                                <div className="flex items-center justify-center">
                                    <AutoFill className="text-2xl text-primary" />
                                    <span className="ml-2">Auto Fill</span>
                                </div>
                            }
                            className="mr-4"
                        >
                            <div className="flex flex-col items-center">
                                <Input
                                    type="text"
                                    placeholder="Enter value"
                                    className="w-full p-2 border"
                                />
                                <div className="flex items-center w-full mt-2">
                                    <CheckBox bordered={false} className="mr-2" />
                                    <span className="text-black">Auto</span>
                                </div>
                                <Button
                                    onClick={handleAutoFill}
                                    color={Colors.secondary}
                                    className="mx-auto rounded-lg hover:bg-secondary group"
                                >
                                    <span className="ml-2">Auto Fill</span>
                                </Button>
                            </div>
                        </DropdownButton>

                        <Button
                            onClick={() => dispatch(flushAnonymizeList())}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary"
                            aria-label="Clear all anonymized data"
                        >
                            <Empty className="text-xl text-primary" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody color={Colors.almond}>
                <div className="flex flex-col w-full gap-4">
                    <div className="flex-1 overflow-auto break-words">
                        <PatientTable
                            patients={patients}
                            onClickRow={setSelectedPatientId}
                            onChangePatient={onChangePatient}
                            onRemovePatient={onRemovePatient}
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <StudyTable
                            studies={studies}
                            onChangeStudy={onChangeStudy}
                            onRemoveStudy={onRemoveStudy}
                        />
                    </div>
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex flex-col items-center gap-3 border-t-2 shadow-inner border-slate-200 bg-light">
                <div className="flex flex-col gap-3 mt-2 mb-2 sm:flex-row">
                    <Button
                        className="flex items-center w-full gap-2 sm:w-auto"
                        color={Colors.blueCustom}
                        onClick={handleAnonymizeStart}
                        aria-label="Start anonymization process"
                    >
                        <Anon />
                        Anonymize
                    </Button>
                    <SelectInput
                        placeholder="Select an option"
                        value={anonList.anonymizationProfile}
                        options={profileOptions}
                        onChange={onChangeProfile}
                        className="justify-center w-full sm:w-auto"
                    />
                </div>
            </CardFooter>
            <div className="mt-4">
                <AnonQueues showResults={true} />
            </div>
        </>
    );
};

export default AnonymizeRoot;
