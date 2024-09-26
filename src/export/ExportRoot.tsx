import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ExportStudyTable from "./ExportStudyTable";
import ExportSeriesTable from "./ExportSeriesTable";
import { Button, Card, CardFooter } from "../ui";
import { Colors } from "../utils";

const ExportRoot = () => {

    const dispatch = useDispatch();
    const exportSeriesList = useSelector((state: RootState) => state.export.series);
    const exportStudyList = useSelector((state: RootState) => state.export.studies);

    const handleClearList = () => {

    }

    const handleExport = () => {
        
    }
    return (
        <Card>
        <div className="flex flex-col">
           <ExportStudyTable studies={Object.values(exportStudyList)}/>
           <ExportSeriesTable series={Object.values(exportSeriesList)}/>
           
        </div>
        <div>
        <CardFooter color={Colors.light} className="flex justify-center gap-3">
                <Button
                    onClick={handleClearList}
                    color={Colors.warning}
                >
                    Empty List
                </Button>
                <Button
                    onClick={handleExport}
                    color={Colors.danger}
                >
                    Download
                </Button>
            </CardFooter>
        </div>
        </Card>
    )
}

export default ExportRoot