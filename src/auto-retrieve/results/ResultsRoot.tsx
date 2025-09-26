import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Papa from "papaparse";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Button, Modal, Tab, Tabs } from "../../ui";
import ResultStudiesTable from "./ResultStudiesTable";
import ResultSeriesTable from "./ResultSeriesTable";
import { Colors } from "../../utils";
import { Download, Empty } from "../../icons";
import { RootState, store } from "../../store";
import { addStudyOrSeriesToBasket, removeSeriesResults, removeStudyResults, updateSeriesResultSelection, updateStudyResultSelection } from "../../reducers/AutoRetrieveSlice";
import { exportCsv } from "../../utils/export";
import LoadSeriesCSV from "./LoadSeriesCSV";
import { useTranslation } from "react-i18next";

type ResultsRootProps = {
    onStartSeriesQueries: () => void
}

const ResultsRoot = ({ onStartSeriesQueries }: ResultsRootProps) => {

    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation()

    const studyResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);
    const seriesResults = useSelector((state: RootState) => state.autoRetrieve.seriesResults);
    const [openLoadSeriesCSV, setOpenLoadSeriesCSV] = useState(false);

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
        navigate('/auto-retrieve/results/' + tab);
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

    const onDownloadCSVStudy = () => {
        const payload = studyResults.map((query) => ({
            patientName: query.patientName,
            patientId: query.patientId,
            studyDescription: query.studyDescription,
            accessionNumber: query.accessionNumber,
            dateFrom: query.studyDate,
            dateTo: query.studyDate,
            modalitiesInStudy: query.modalitiesInStudy,
            studyInstanceUID: query.studyInstanceUID,
            numberOfStudyRelatedSeries: query.numberOfStudyRelatedSeries,
            numberOfStudyRelatedInstances: query.numberOfStudyRelatedInstances,
            aet: query.originAET,
        }));
        const csvString = Papa.unparse(payload);
        exportCsv(csvString, ".csv", "auto-queries.csv");
    }

    const onDownloadCSVSeries = () => {
        const payload = seriesResults.map((query) => ({
            patientName: query.patientName,
            patientId: query.patientId,
            studyDescription: query.studyDescription,
            seriesDescription: query.seriesDescription,
            accessionNumber: query.accessionNumber,
            dateFrom: query.studyDate,
            dateTo: query.studyDate,
            modality: query.modality,
            studyInstanceUID: query.studyInstanceUID,
            seriesInstanceUID: query.seriesInstanceUID,
            seriesNumber: query.seriesNumber,
            numberOfSeriesRelatedInstances: query.numberOfSeriesRelatedInstances,
            aet: query.originAET,
        }));
        const csvString = Papa.unparse(payload);
        exportCsv(csvString, ".csv", "auto-queries.csv");
    }

    const onClickLoadSeriesCSV = () => {
        setOpenLoadSeriesCSV((openLoadSeriesCSV) => !openLoadSeriesCSV);
    }

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
                            <Button color={Colors.primary} onClick={onAddToBasketStudies}>{t("auto-retrieve.results.add-to-basket")}</Button>
                            <Button color={Colors.primary} onClick={onStartSeriesQueries}>Query series</Button>
                            <Button className="flex gap-3" color={Colors.success} onClick={onDownloadCSVStudy}><Download />CSV</Button>
                            <Button color={Colors.warning} onClick={onRemoveStudiesResults}><Empty /></Button>
                        </div>
                    </>
                } />
                <Route path="series" element={
                    <>
                        <Modal show={openLoadSeriesCSV} size="xl">
                            <Modal.Header onClose={onClickLoadSeriesCSV}>
                                <Modal.Title>Load Series from CSV</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <LoadSeriesCSV />
                            </Modal.Body>
                        </Modal>
                        <ResultSeriesTable
                            onRowSelectionChange={handleSeriesSelectionChange}
                            selectedRow={seriesSelectedRow}
                            resultSeries={seriesResults} />
                        <div className="flex justify-center p-3 gap-3">
                            <div className="grow flex justify-center gap-3">
                                <Button color={Colors.primary} onClick={onAddToBasketSeries}>{t("auto-retrieve.results.add-to-basket")}</Button>
                                <Button className="flex gap-3" color={Colors.success} onClick={onDownloadCSVSeries}><Download />CSV</Button>
                                <Button color={Colors.warning} onClick={onRemoveSeriesResults}><Empty /></Button>
                            </div>
                            <div className="flex justify-end">
                                <Button color={Colors.secondary} onClick={onClickLoadSeriesCSV}>Load From CSV</Button>
                            </div>
                        </div>

                    </>
                } />
            </Routes>
        </div>
    )
}

export default ResultsRoot;