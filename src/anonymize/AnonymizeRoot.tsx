import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter, Button, SelectInput } from "../ui";
import { Colors } from "../utils";
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
const profileOptions = [
    { value: "default", label: "Default" },
    { value: "full", label: "Full" },
];

const AnonymizeRoot = () => {
    const dispatch = useDispatch();
    const anonList = useSelector((state: RootState) => state.anonymize);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
        null
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

    return (
        <Card>
            <CardHeader color={Colors.primary}>
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">
                        Anonymiser les ressources
                    </div>
                    <div className="flex justify-end w-1/5 gap-3 p-3">
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
                    <div className="flex-1 overflow-auto">
                        <PatientTable
                            patients={patients}
                            onClickRow={setSelectedPatientId}
                            onChangePatient={(patientId, key, value) =>
                                dispatch(
                                    updateAnonymizePatientValue({ patientId, [key]: value })
                                )
                            }
                            onRemovePatient={(patientId) =>
                                studies
                                    .filter(
                                        (study) => study.originalStudy.parentPatient === patientId
                                    )
                                    .forEach((study) =>
                                        dispatch(
                                            removeStudyFromAnonymizeList({ studyId: study.originalStudy.id })
                                        )
                                    )
                            }
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <StudyTable
                            studies={studies}
                            onChangeStudy={(studyId, key, value) =>
                                dispatch(
                                    updateAnonymizeStudyValue({ studyId, [key]: value })
                                )
                            }
                            onRemoveStudy={(studyId) =>
                                dispatch(removeStudyFromAnonymizeList({ studyId }))
                            }
                        />
                    </div>
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center gap-3">
                <Button className="flex items-center gap-2 px-3 py-1" color={Colors.blueCustom}>
                    <Anon />
                    Anonymiser
                </Button>
                <SelectInput
                    placeholder="Sélectionner une option"
                    value={anonList.anonymizationProfile}
                    options={profileOptions}
                    onChange={(option) =>
                        dispatch(updateAnonymizationProfile({ anonymizationProfile: option.value }))
                    }
                />
            </CardFooter>
        </Card>
    );
};

export default AnonymizeRoot;
