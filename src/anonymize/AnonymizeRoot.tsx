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
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
        null
    );

    const [anonJobId, setAnonJobId] = useState<string | null>(null);

    const { mutate: mutateCreateAnonymizeQueue } = useCustomMutation(
        ({ anonItems }) => createAnonymizeQueue(anonItems),
        [['queue', 'anon']],
        {
            onSuccess: (jobId) => {
                setAnonJobId(jobId)
            },
        }
    )

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

    const onChangeStudy = (studyId, key, value) => {
        dispatch(
            updateAnonymizeStudyValue({ studyId, [key]: value })
        )
    }

    const onRemoveStudy = (studyId) => {
        dispatch(removeStudyFromAnonymizeList({ studyId }))
    }

    const onChangePatient = (patientId, key, value) => {
        dispatch(
            updateAnonymizePatientValue({ patientId, [key]: value })
        )
    }

    const onRemovePatient = (patientId) => {
        studies.filter((study) => study.originalStudy.parentPatient === patientId).
            forEach((study) => {
                console.log(study.originalStudy.id)
                dispatch(
                    removeStudyFromAnonymizeList({ studyId: study.originalStudy.id })
                )
            }
            )

    }

    const onChangeProfile = (option) => {
        dispatch(updateAnonymizationProfile({ anonymizationProfile: option.value }))
    }

    const handleAnonymizeStart = () => {
        const anonItems: AnonItem[] = Object.values(anonList.studies).map((study) => {
            return {
                OrthancStudyID: study.originalStudy.id,
                Profile: anonList.anonymizationProfile,
                NewPatientID: study.newPatientId,
                NewPatientName: study.newPatientName,
                NewStudyDescription: study.newStudyDescription,
                NewAccessionNumber: study.newAccessionNumber
            }

        })
        mutateCreateAnonymizeQueue({ anonItems })
    }

    return (
        <Card>
            <CardHeader color={Colors.primary}>
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">
                        Anonymize resources                    </div>
                    <div className="flex justify-end w-1/5 p-3">


                        <DropdownButton row={null}
                            options={[]} buttonText="Auto Fill"
                            className="">
                            <Input
                                type="text"
                                placeholder="Enter value"
                                className="w-full p-2 border"
                            />
                            <CheckBox bordered={false}
                            />
                        </DropdownButton>

                        <AutoFill className="text-xl text-primary group-hover:text-white" />
                        <Button
                            onClick={() => dispatch(flushAnonymizeList())}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group"
                        >
                            <Empty className="text-xl text-primary group-hover:text-white" />
                        </Button>
                        <Button
                            onClick={handleAutoFill}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group"
                        >
                            <AutoFill className="text-xl text-primary group-hover:text-white" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody color={Colors.almond}>
                <div className="flex flex-row w-full gap-4">
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
            <CardFooter
                color={Colors.light}
                className="flex items-center gap-3">
                <Button
                    className="flex items-center gap-2 "
                    color={Colors.blueCustom} onClick={handleAnonymizeStart}>
                    <Anon />
                    Anonymise
                </Button>
                <SelectInput
                    placeholder="Select an option"
                    value={anonList.anonymizationProfile}
                    options={profileOptions}
                    onChange={onChangeProfile}
                />
                <AnonQueues />
            </CardFooter>
        </Card>
    );
};

export default AnonymizeRoot;
