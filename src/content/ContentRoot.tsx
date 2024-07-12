import { useMemo, useState } from "react";
import SearchForm from "../query/SearchForm";
import { getLabels } from "../services";
import { findTools } from "../services/tools";
import { QueryPayload, useCustomMutation, useCustomQuery } from "../utils";
import { Study as StudyType } from "../utils/types";
import Model from "../model/Model";
import { FormCard } from "../ui";
import AccordionPatient from "./AccordionPatient";

const ContentRoot = () => {
    const [refModel, setRefModel] = useState<Model | null>(null);

    const patients = useMemo(() => {
        if (refModel == null) return []
        return refModel.getPatients()
    }, [JSON.stringify(refModel)])

    const { data: labelsData } = useCustomQuery<string[]>(
        ['labels'],
        () => getLabels(),
    );

    const { mutateAsync: mutateTools } = useCustomMutation<StudyType[], any>(
        ({ formData }) => findTools(formData),
        [],
        {
            onSuccess: (data) => {
                const model = new Model();
                console.log("Data", data)
                data.forEach(studyData => {
                    model.addStudy(studyData);
                });
                setRefModel(model);
            },
            onError: (error: any) => {
                console.log("Error", error);
            }
        }
    )
    const handleSubmit = async (formData: QueryPayload) => {
        await mutateTools({ formData });
    }

    return (
        <div className="flex flex-col items-center w-full">
            <FormCard
                className="flex flex-col justify-center w-11/12 bg-white gap-y-2"
                title={"Search"}
                collapsible={true}
            >
                <SearchForm
                    onSubmit={handleSubmit}
                    labelsData={labelsData}
                    withAets={true}
                />
            </FormCard>
            <div className="flex flex-col items-center w-full">
                <div className="mb-4 text-2xl font-bold text-primary">Results</div>
                <div className="w-11/12">
                    {patients.map((patient) => {
                        return (<AccordionPatient key={patient.id} patient={patient} onDeletePatient={() => { }} onEditPatient={() => { }} />)
                    })
                    }
                </div>
            </div>
        </div>
    )
};

export default ContentRoot;
