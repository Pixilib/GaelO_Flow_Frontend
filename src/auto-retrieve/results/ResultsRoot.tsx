import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudIesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { Colors } from "../../utils";
import { Empty } from "../../icons";
import { RootState, store } from "../../store";
import { clearSeriesResults, clearStudyResults } from "../../reducers/AutoRetrieveSlice";

type ResultsRootProps = {
    onStartSeriesQueries: () => void
}

const ResultsRoot = ({ onStartSeriesQueries }: ResultsRootProps) => {

    const studyResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);
    const seriesResults = useSelector((state: RootState) => state.autoRetrieve.seriesResults);

    const location = useLocation();
    const navigate = useNavigate();

    const onClearStudyResults = () => {
        store.dispatch(clearStudyResults());
    }

    const onClearSeriesResults = () => {
        store.dispatch(clearSeriesResults());
    }

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
                            <Button color={Colors.primary} onClick={onStartSeriesQueries}>Query Series</Button>
                            <Button color={Colors.warning} onClick={onClearStudyResults}><Empty /></Button>
                        </div>
                    </>
                } />
                <Route path="series" element={
                    <>
                        <ResultSeriesTable resultSeries={seriesResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.warning} onClick={onClearSeriesResults}><Empty /></Button>
                        </div>
                    </>
                } />
            </Routes>
        </div>
    )
}

export default ResultsRoot;