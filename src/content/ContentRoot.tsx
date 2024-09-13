
import React, { useMemo, useState } from "react";
import { getLabels, findTools, useConfirm, deletePatient } from "../services";
import { QueryPayload, useCustomMutation, useCustomQuery, useCustomToast, Study as StudyType } from "../utils";

import Model from "../model/Model";
import Patient from "../model/Patient";

import { FormCard, Spinner } from "../ui";

import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patients/AccordionPatient";
import EditPatient from "./patients/EditPatient";
import { Label } from "../utils/types";

const ContentRoot: React.FC = () => {
    const { confirm } = useConfirm();
    const { toastSuccess, toastError } = useCustomToast();

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

    const refreshFind = () => {
        if (queryPayload) {
            mutateToolsFind(queryPayload);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <EditPatient
                key={editingPatient?.id ?? undefined}
                patient={editingPatient as Patient}
                onEditPatient={handlePatientUpdate}
                onClose={closeEditModal}
                show={editingPatient != null}
            />
            <FormCard
                className="flex flex-col justify-center w-11/12 bg-white gap-y-2"
                title="Search"
                collapsible={true}
            >
                <SearchForm onSubmit={handleSubmit} labelsData={labelsData} withAets={true} />
            </FormCard>
            <div className="flex flex-col items-center w-full">
                <div className="mb-4 text-2xl font-bold text-primary">Results</div>
                <div className="w-11/12">
                    {isPending ? (
                        <Spinner />
                    ) : (
                        patients.map((patient: Patient) => (
                            <AccordionPatient
                                key={patient.id}
                                patient={patient}
                                onDeletePatient={handleDeletePatient}
                                onEditPatient={(patient) => setEditingPatient(patient)}
                                onStudyUpdated={() => refreshFind()}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentRoot;