import React, { useMemo, useState } from "react";
import { getLabels, findTools, useConfirm, deletePatient } from "../services";
import { QueryPayload, useCustomMutation, useCustomQuery, useCustomToast, Study as StudyType } from "../utils";
import Model from "../model/Model";
import Patient from "../model/Patient";
import { FormCard, Spinner, Button } from "../ui";
import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patients/AccordionPatient";
import EditPatient from "./patients/EditPatient";
import { Label } from "../utils/types";
import { addStudyIdToDeleteList, addSeriesOfStudyIdToExportList, addStudyIdToAnonymizeList } from '../utils/actionsUtils';
import { Colors } from '../utils';
import AnonIcon from './../assets/Anon.svg?react';
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { FaFileExport as ExportIcon } from "react-icons/fa";
import SelectLabels from "../datasets/SelectLabels";
const ContentRoot: React.FC = () => {
    const { confirm } = useConfirm();
    const { toastSuccess, toastError } = useCustomToast();

    const [selectedStudies, setSelectedStudies] = useState<{ [studyId: string]: boolean }>({});
    const [model, setModel] = useState<Model | null>(null);
    const [queryPayload, setQueryPayload] = useState<QueryPayload | null>(null);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const patients = useMemo(() => model?.getPatients() || [], [model]);

    const handleDeletePatient = async (patient: Patient) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this patient:
                <span className="text-xl not-italic font-bold text-primary">{patient.patientId} {patient.patientName} ?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeletePatient(patient.id);
        }
    };

    const closeEditModal = () => {
        setEditingPatient(null);
    };

    const handlePatientUpdate = () => {
        closeEditModal();
        refreshFind();
    };

    const { mutateAsync: mutateDeletePatient } = useCustomMutation<void, string>(
        (patientId) => deletePatient(patientId),
        [['jobs']],
        {
            onSuccess: async () => {
                toastSuccess("Patient deleted successfully");
                refreshFind();
            },
            onError: (error: any) => {
                toastError(`Failed to delete patient ${error}`);
            }
        }
    );

    const { data: labelsData } = useCustomQuery<Label[], string[]>(
        ['labels'],
        () => getLabels(),
        {
            select: (labels) => labels.map((label) => label.name),
        }
    );

    const { mutateAsync: mutateToolsFind, isPending } = useCustomMutation<StudyType[], QueryPayload>(
        findTools,
        [],
        {
            onSuccess: (data) => {
                const newModel = new Model();
                data.forEach(studyData => newModel.addStudy(studyData));
                setModel(newModel);
            },
            onError: (error: any) => {
                toastError("Failed to load data: " + error);
            }
        }
    );

    const handleSubmit = async (formData: QueryPayload) => {
        setQueryPayload(formData);
        mutateToolsFind(formData);
    };

    const handlePatientSelectionChange = (selected: boolean, patient: Patient) => {
        const studies = patient.getStudies().map(study => study.id);
        const newSelectedStudies = { ...selectedStudies };
        if (selected) {
            studies.forEach((studyId) => {
                newSelectedStudies[studyId] = true;
            });
            setSelectedStudies(newSelectedStudies);
        } else {
            studies.forEach((studyId) => {
                delete newSelectedStudies[studyId];
            });
            setSelectedStudies(newSelectedStudies);
        }
    };

    const refreshFind = () => {
        if (queryPayload) {
            mutateToolsFind(queryPayload);
        }
    };

    const handleSendAnonymizeList = async () => {
        const studyIds = Object.keys(selectedStudies);
        for (const studyId of studyIds) {
            await addStudyIdToAnonymizeList(studyId);
        }
    };

    const handleSendExportList = async () => {
        const studyIds = Object.keys(selectedStudies);
        for (const studyId of studyIds) {
            await addSeriesOfStudyIdToExportList(studyId);
        }
    };

    const handleSendDeleteList = async () => {
        const studyIds = Object.keys(selectedStudies);
        for (const studyId of studyIds) {
            await addStudyIdToDeleteList(studyId);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <EditPatient
                key={editingPatient?.id ?? undefined}
                patient={editingPatient as Patient}
                onEditPatient={handlePatientUpdate}
                onClose={closeEditModal}
                show={editingPatient != null}
            />
            <FormCard
                className="bg-white"
                title="Search"
                collapsible={true}
            >
                <SearchForm onSubmit={handleSubmit} labelsData={labelsData} withAets={true} />
            </FormCard>
            <div className="flex flex-col items-center w-full gap-3">
                <div className="flex justify-center w-full text-2xl font-bold text-primary">Results</div>
                <div className="flex w-full p-4 bg-white shadow-md rounded-3xl">
                    <Button
                        color={Colors.primary}
                        className="flex items-center mx-2 text-sm transition-transform duration-200 bg-blue-700 hover:scale-105"
                        onClick={handleSendAnonymizeList}>
                        <AnonIcon className="text-xl" />
                        <span className="ml-2">Send to Anonymize</span>
                    </Button>

                    <Button
                        color={Colors.secondary}
                        className="flex items-center mx-2 text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendExportList}
                    >
                        <ExportIcon className="text-xl" />
                        <span className="ml-2">Send to Export</span>
                    </Button>

                    <Button
                        color={Colors.danger}
                        className="flex items-center mx-2 text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendDeleteList}
                    >
                        <DeleteIcon className="text-xl" />
                        <span className="ml-2">Send to delete</span>
                    </Button>

                    <SelectLabels
                        onChange={(labels) => console.log(labels)}
                        closeMenuOnSelect={true}
                    />
                </div>
                <div className="w-full">
                    {isPending ? (
                        <Spinner />
                    ) : (
                        patients.map((patient: Patient) => (
                            <AccordionPatient
                                key={patient.id}
                                patient={patient}
                                onPatientSelectionChange={handlePatientSelectionChange}
                                onDeletePatient={handleDeletePatient}
                                onEditPatient={(patient) => setEditingPatient(patient)}
                                onStudyUpdated={() => refreshFind()}
                                onSelectedStudyChange={(selectedState) => setSelectedStudies(selectedState)}
                                selectedStudies={selectedStudies}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentRoot;
