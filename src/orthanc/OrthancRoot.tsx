import { useState } from "react";
import SearchForm from "../query/SearchForm";
import { getLabels } from "../services";
import { findTools } from "../services/tools";
import { QueryPayload, useCustomMutation, useCustomQuery } from "../utils";
import Model from "../model/Model";
import OrthancResults from "./OrthancResults";
import { FormCard } from "../ui";

const OrthancRoot = () => {
    const [refModel, setRefModel] = useState<Model | null>(null);

    const { data: labelsData } = useCustomQuery<string[]>(
        ['labels'],
        () => getLabels(),
    );

    const { mutateAsync: mutateTools } = useCustomMutation<StudyType[], any>(
        ({ formData }) => findTools(formData),
        [],
        {
            onSuccess: (data) => {
                console.log(data);
                const model = new Model();
                data.forEach(studyData => {
                    model.addStudy(studyData);
                });
                console.log(model);
                setRefModel(model);
            },
            onError: (error:any) => {
                console.log("Error",error);
            }
        }
    )
    const handleSubmit = async (formData: QueryPayload) => {
        console.log(formData);
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
                <h2 className="mb-4 text-2xl font-bold text-primary">Results</h2>
                <div className="w-11/12">
                    <OrthancResults model={refModel} onEdit={(id) => console.log("Edit", id)} onDelete={(id) => console.log("Delete", id)} />
                </div>
            </div>
        </div>
    )
};

export default OrthancRoot;
