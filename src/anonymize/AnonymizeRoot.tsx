import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter, Button } from "../ui";
import { Colors } from "../utils";
import PatientTable from "./PatientTable";
import StudyTable from "./StudyTable";
import { RootState } from "../store";
import { useMemo, useState } from "react";
import { flushAnonymizeList, removeStudyFromAnonymizeList, updateAnonymizePatientValue, updateAnonymizeStudyValue } from "../reducers/AnonymizeSlice";
import { Empty } from "../icons";
import { Patient } from "../utils/types";

const AnonymizeRoot = () => {
    const dispatch = useDispatch();
    const anonList = useSelector((state: RootState) => state.anonymize);
    const [selectedPatientId, setSelectedPatientId] = useState<string|null>(null)


    const patients = useMemo(() => {
        return Object.values(anonList.patients);
    }, [anonList]);

    const studies = useMemo(() => {
        if(!selectedPatientId) return []
        return Object.values(anonList.studies).filter(study => study.originalStudy.parentPatient === selectedPatientId);
    }, [anonList, selectedPatientId]);

    const handlePatientSelect = (patient : Patient) => {
        setSelectedPatientId(patient.id)
    }
    const handleRemovePatient = (patientId: string) => {
        const studiesIds = studies
            .filter((study) => study.originalStudy.parentPatient === patientId)
            .map((study) => study.originalStudy.id);
        for (const studyId of studiesIds) {
            dispatch(removeStudyFromAnonymizeList({ studyId }));
        }
    };

    const handleRemoveStudy = (studyId: string) => {
        dispatch(removeStudyFromAnonymizeList({ studyId }));
    };

    const handleChangeStudy = (studyId: string, newStudyDescription: string) => {
        dispatch(updateAnonymizeStudyValue({ newStudyDescription, studyId }));
    };

    const handleChangePatient = (patientId: string, key: 'newPatientId' | 'newPatientName', value: string) => {
        dispatch(updateAnonymizePatientValue({ patientId, [key]: value }));
    }

    const handleClearList = () => {
        dispatch(flushAnonymizeList());
    };

    return (
        <Card>
            <CardHeader
                color={Colors.primary}
            >
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">Anonymize Ressources</div>
                    <div className="flex justify-end w-1/5 gap-3 p-3">
                        <Button
                            onClick={handleClearList}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group">
                            <Empty
                                className="text-xl text-bol text-primary group-hover:text-white" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody color={Colors.almond}>
                <div className="flex flex-row w-full gap-4">
                    <div className="flex-1 overflow-auto">
                        <PatientTable patients={patients} onClickRow={handlePatientSelect} onChangePatient={handleChangePatient} onRemovePatient={handleRemovePatient} />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <StudyTable studies={studies} onChangeStudy={handleChangeStudy} onRemoveStudy={handleRemoveStudy} />
                    </div>
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center gap-3">
            </CardFooter>
        </Card>
    );
};

export default AnonymizeRoot;
