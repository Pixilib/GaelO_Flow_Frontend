import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudIesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { QueryResultSeries, QueryResultStudy } from "../../utils/types";
import { Colors } from "../../utils";
import { Empty } from "../../icons";

type ResultsRootProps = {
    studyResults: QueryResultStudy[]
    seriesResults: QueryResultSeries[]
    onStartSeriesQueries: () => void
    onClearStudyResults: () => void
    onClearSeriesResults: () => void
    onCreateRobotStudy: () => void
    onCreateRobotSeries: () => void
}
const ResultsRoot = ({ studyResults, seriesResults, onStartSeriesQueries, onClearStudyResults, onClearSeriesResults, onCreateRobotStudy, onCreateRobotSeries }: ResultsRootProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        navigate(tab);
    };

    return (
        <div>
            <Tabs className="bg-primary rounded-t-xl">
                <Tab
                    title="Studies"
                    active={location.pathname.endsWith("/studies")}
                    onClick={() => handleTabClick("studies")}
                />
                <Tab
                    title="Series"
                    active={location.pathname.endsWith("/series")}
                    onClick={() => handleTabClick("series")}
                />
            </Tabs>
            <Routes>
                <Route path="studies" element={
                    <>
                        <ResultStudiesTable resultStudies={studyResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.success} onClick={onCreateRobotStudy}>Start Robot Study</Button>
                            <Button color={Colors.primary} onClick={onStartSeriesQueries}>Query Series</Button>
                            <Button color={Colors.warning} onClick={onClearStudyResults}><Empty /></Button>
                        </div>
                    </>
                } />
                <Route path="series" element={
                    <>
                        <ResultSeriesTable resultSeries={seriesResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.success} onClick={onCreateRobotSeries}>Start Robot Series</Button>
                            <Button color={Colors.warning} onClick={onClearSeriesResults}><Empty /></Button>
                        </div>
                    </>
                } />
            </Routes>
        </div>
    )
}

export default ResultsRoot;