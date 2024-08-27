import Card from "../ui/Card";
import { CardHeader, CardFooter, CardBody } from "../ui/Card";
import { Colors } from "../utils";
import { Button } from "../ui";
import SelectLabels from "./SelectLabels";
import DatasetTableStudy from "./studies/DatasetTableStudy";
import DatasetSeriesTable from "./series/DatasetSeriesTable";
import { Series, StudyMainDicomTags } from "../utils/types";

const studies: (StudyMainDicomTags & { id: string; })[] = [
];

const series: Series[] = [
];

const DatasetRoot = () => {
    const handleSelectChange = (selectedLabels: any) => {
        console.log("Selected options:", selectedLabels);
    };

    const handleButtonClick = () => {
        console.log("Button clicked");
    };

    const handleStudyRowClick = (studyId: any) => {
        console.log("Study row clicked:", studyId);
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
            <CardBody color={Colors.almond} className="space-x-4">
                <SelectLabels onChange={handleSelectChange} closeMenuOnSelect={false} />

                <DatasetTableStudy
                    studies={studies}
                    onRowClick={handleStudyRowClick}
                    onActionClick={handleStudyActionClick}
                />

                <DatasetSeriesTable
                    series={series}
                    onActionClick={handleSeriesActionClick}
                />
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
