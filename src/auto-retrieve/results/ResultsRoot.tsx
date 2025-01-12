import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudIesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { QueryResultSeries, QueryResultStudy } from "../../utils/types";
import { Colors } from "../../utils";

type ResultsRootProps = {
    studyResults: QueryResultStudy[]
    seriesResults: QueryResultSeries[]
    onStartSeriesQueries: () => void
}
const ResultsRoot = ({ studyResults, seriesResults, onStartSeriesQueries }: ResultsRootProps) => {
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
                            <Button color={Colors.success} onClick={() => { }}>Start Robot Study</Button>
                            <Button color={Colors.primary} onClick={onStartSeriesQueries}>Query Series</Button>
                        </div>
                    </>
                } />
                <Route path="series" element={
                    <>
                        <ResultSeriesTable resultSeries={seriesResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.success} onClick={() => { }}>Start Robot Series</Button>
                        </div>
                    </>
                } />
            </Routes>
        </div>
    )
}

export default ResultsRoot;