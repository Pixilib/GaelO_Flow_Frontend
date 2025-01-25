import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudIesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { Colors } from "../../utils";
import { Empty } from "../../icons";
import { RootState, store } from "../../store";
import { addStudyOrSeriesToBasket, removeSeriesResults, removeStudyResults, updateSeriesResultSelection, updateStudyResultSelection } from "../../reducers/AutoRetrieveSlice";

type ResultsRootProps = {
    onStartSeriesQueries: () => void
}

const ResultsRoot = ({ onStartSeriesQueries }: ResultsRootProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const studyResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);
    const seriesResults = useSelector((state: RootState) => state.autoRetrieve.seriesResults);

    const studiesSelectedRow: Record<number, boolean> = useMemo(() => {
        return studyResults.reduce((acc, query, index) => {
            acc[query.studyInstanceUID] = query.selected;
            return acc;
        }, {});
    }, [studyResults]);

    const seriesSelectedRow: Record<number, boolean> = useMemo(() => {
        return seriesResults.reduce((acc, query, index) => {
            acc[query.seriesInstanceUID] = query.selected;
            return acc;
        }, {});
    }, [seriesResults]);

    const onRemoveStudiesResults = () => {
        studyResults.filter((study) => study.selected).forEach((study) => {
            store.dispatch(removeStudyResults({ instanceUID: study.studyInstanceUID }));
        });
    }

    const onRemoveSeriesResults = () => {
        seriesResults.filter((series) => series.selected).forEach((series) => {
            store.dispatch(removeSeriesResults({ instanceUID: series.seriesInstanceUID }));
        });
    }

    const handleTabClick = (tab: string) => {
        navigate(tab);
    };

    const onAddToBasketSeries = () => {
        seriesResults.filter((series) => series.selected).forEach((series) => {
            store.dispatch(addStudyOrSeriesToBasket(series));
        });
    };

    const onAddToBasketStudies = () => {
        studyResults.filter((study) => study.selected).forEach((study) => {
            store.dispatch(addStudyOrSeriesToBasket(study));
        });
    };

    const handleSeriesSelectionChange = (selectedState: Record<string, boolean>) => {
        store.dispatch(updateSeriesResultSelection(selectedState));
    };

    const handleStudiesSelectionChange = (selectedState: Record<string, boolean>) => {
        store.dispatch(updateStudyResultSelection(selectedState));
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
                        <ResultStudiesTable
                            resultStudies={studyResults}
                            onRowSelectionChange={handleStudiesSelectionChange}
                            selectedRow={studiesSelectedRow}
                        />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.primary} onClick={onAddToBasketStudies}>Add to basket</Button>
                            <Button color={Colors.primary} onClick={onStartSeriesQueries}>Query series</Button>
                            <Button color={Colors.warning} onClick={onRemoveStudiesResults}><Empty /></Button>
                        </div>
                    </>
                } />
                <Route path="series" element={
                    <>
                        <ResultSeriesTable
                            onRowSelectionChange={handleSeriesSelectionChange}
                            selectedRow={seriesSelectedRow}
                            resultSeries={seriesResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <Button color={Colors.primary} onClick={onAddToBasketSeries}>Add to basket</Button>
                            <Button color={Colors.warning} onClick={onRemoveSeriesResults}><Empty /></Button>
                        </div>
                    </>
                } />
            </Routes>
        </div>
    )
}

export default ResultsRoot;