
import React, { useMemo, useState } from "react";
import { getLabels, findTools } from "../services";
import { QueryPayload, useCustomMutation, useCustomQuery, useCustomToast, Study as StudyType } from "../utils";

import Model from "../model/Model";
import Patient from "../model/Patient";

import { FormCard, Spinner } from "../ui";

import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patients/AccordionPatient";

const ContentRoot: React.FC = () => {
    const { toastError } = useCustomToast();

    const [model, setModel] = useState<Model | null>(null);
    const [queryPayload, setQueryPayload] = useState<QueryPayload | null>(null);

    const patients = useMemo(() => model?.getPatients() || [], [model]);

    const { data: labelsData } = useCustomQuery<string[]>(
        ['labels'],
        () => getLabels(),
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
            onError: (error:any) => {
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
                                onPatientEdited={refreshFind}
                                onPatientDeleted={refreshFind}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentRoot;