import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudIesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { QueryResult } from "../../utils/types";

type ResultsRootProps = {
    studyResults: QueryResult[]
    seriesResults: QueryResult[]
}
const ResultsRoot = ({ studyResults, seriesResults }: ResultsRootProps) => {
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
                <Route path="studies" element={<ResultStudiesTable resultStudies={studyResults} />} />
                <Route path="series" element={<ResultSeriesTable resultSeries={seriesResults} />} />
            </Routes>
        </div>
    )
}

export default ResultsRoot;