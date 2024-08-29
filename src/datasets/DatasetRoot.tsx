import Card, { CardHeader, CardFooter, CardBody } from "../ui/Card";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import { Button } from "../ui";
import SelectLabels from "./SelectLabels";
import DatasetTableStudy from "./studies/DatasetTableStudy";
import DatasetSeriesTable from "./series/DatasetSeriesTable";
import { findTools } from "../services";
import Model from "../model/Model";
import { useState } from "react";
import { FindPayload, Series } from "../utils/types";
import { getSeriesOfStudy } from "../services/orthanc";

const DatasetRoot = () => {
    const [model, setModel] = useState<Model | null>(null);
    const [currentStudyId, setCurrentStudyId] = useState<string | null>(null);
    const { toastError } = useCustomToast();
    const studies = model?.getPatients().map(patient => patient.getStudies()).flat() ?? [];


    const { data: series } = useCustomQuery<Series[]>(
        ['series', (currentStudyId as string)],
        () => getSeriesOfStudy(currentStudyId as string),
        {
            onError: (error) => {
                console.error(`No series for this study or an error occured: ${error}`);
            },
            enabled: !!currentStudyId
        },
    );

    const { mutateAsync: mutateToolsFind } = useCustomMutation(
        ({ queryPayload }) => findTools(queryPayload),
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

    const handleSelectChange = (selectedLabels: any) => {
        if (selectedLabels.length === 0) {
            setModel(new Model()); return
        }
        
        const queryPayload: FindPayload = {
            Level: 'Study',
            Labels: selectedLabels,
            LabelsConstraint: "Any",
            Query: {}
        };
        mutateToolsFind({ queryPayload });
    };

    const handleButtonClick = () => {
        console.log("Button clicked");
    };

    const handleStudyRowClick = (studyId: string) => {
        console.log(studyId)
        setCurrentStudyId(studyId);
    };

    const handleStudyActionClick = (action: any, studyId: any) => {
        console.log(`Study action "${action}" clicked for study ID: ${studyId}`);
    };

    const handleSeriesActionClick = (action: any, series: any) => {
        console.log(`Series action "${action}" clicked for series:`, series);
    };

    return (
        <Card>
            <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title="Dataset"
            />
            <CardBody color={Colors.almond} className="px-3 space-y-4">
                <div className="space-y-2">
                    <span className="text-base font-semibold text-gray-700">Labels</span>
                    <SelectLabels onChange={handleSelectChange} closeMenuOnSelect={false} />
                </div>
                <div className="p-4 mt-4 bg-white ">
                    <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700">Studies</span>
                    <DatasetTableStudy
                        studies={studies}
                        onRowClick={handleStudyRowClick}
                        onActionClick={handleStudyActionClick}
                        selectedStudyId={null}
                    />
                    <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700">Series</span>
                    {series && (
                        <DatasetSeriesTable
                            series={series}
                            onActionClick={handleSeriesActionClick}
                        />
                    )}
                </div>
            </CardBody>
            <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                <Button color={Colors.secondary} onClick={handleButtonClick}>
                    To Export
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DatasetRoot;