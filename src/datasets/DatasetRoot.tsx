import Card, { CardHeader, CardFooter, CardBody } from "../ui/Card";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import { Button } from "../ui";
import SelectRoleLabels from "./SelectRoleLabels";
import DatasetTableStudy from "./studies/DatasetTableStudy";
import DatasetSeriesTable from "./series/DatasetSeriesTable";
import { findTools } from "../services";
import Model from "../model/Model";
import { useEffect, useState } from "react";
import { FindPayload, Series } from "../utils/types";
import { getSeriesOfStudy } from "../services/orthanc";

const DatasetRoot = () => {
    const [model, setModel] = useState<Model | null>(null);
    const [currentStudyId, setCurrentStudyId] = useState<string | null>(null);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([])
    const { toastError } = useCustomToast();
    const studies = model?.getPatients().map(patient => patient.getStudies()).flat() ?? [];

    const { data: series, refetch } = useCustomQuery<Series[]>(
        ['series', (currentStudyId as string)],
        () => currentStudyId ? getSeriesOfStudy(currentStudyId as string) : new Promise((success, reject) => success([])),
        {
            onError: (error) => {
                console.error(`No series for this study or an error occurred: ${error}`);
            },
            enabled: false
        },
    );

    useEffect(() => {
        refetch()
    }, [currentStudyId])

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

    useEffect(() => {
        if (selectedLabels.length === 0) {
            setModel(new Model());
            setCurrentStudyId(null);
            return;
        }

        const queryPayload: FindPayload = {
            Level: 'Study',
            Labels: selectedLabels,
            LabelsConstraint: "Any",
            Query: {}
        };
        mutateToolsFind({ queryPayload });
    }, [selectedLabels])

    const handleStudyRowClick = (studyId: string) => {
        setCurrentStudyId(studyId);
    };

    const handleStudyActionClick = (action: any, studyId: any) => {
        console.log(`Study action "${action}" clicked for study ID: ${studyId}`);
    };

    const handleSeriesActionClick = (action: any, series: any) => {
        console.log(`Series action "${action}" clicked for series:`, series);
    };

    const handleButtonClick = () => {
        console.log("Button clicked");
    };

    return (
        <Card>
            <CardHeader
                centerTitle
                color={Colors.primary}
                title="Dataset"
            />
            <CardBody className="bg-almond dark:bg-neutral-500">
                <div className="space-y-2">
                    <span className="text-base font-semibold text-gray-700 dark:text-white">Labels</span>
                    <SelectRoleLabels values={selectedLabels} onChange={(labels) => setSelectedLabels(labels)} />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 2xl:grid-cols-12">
                    <div className="2xl:col-span-7">
                        <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700 dark:text-white">Studies</span>
                        <DatasetTableStudy
                            studies={studies}
                            onRowClick={handleStudyRowClick}
                            onActionClick={handleStudyActionClick}
                            selectedStudyId={null}
                        />
                    </div>
                    <div className="2xl:col-span-5">
                        <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700 dark:text-white">Series</span>
                        {series && (
                            <DatasetSeriesTable
                                series={series}
                                onActionClick={handleSeriesActionClick}
                            />
                        )}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner dark:border-slate-600 bg-light dark:bg-slate-950">
                <Button
                    color={Colors.secondary}
                    onClick={handleButtonClick}>
                    To Export
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DatasetRoot;
