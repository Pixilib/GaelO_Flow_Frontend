import { useState } from "react";
import CsvDrop from "../query/CsvDrop";
import LoadSeriesTable from "./LoadSeriesTable";
import { Banner, BannerAlert, Button, ProgressBar } from "./../../ui";
import { Colors, QueryPayload } from "./../../utils";
import { queryModality } from "../../services";
import { addSeriesResult } from "./../../reducers/AutoRetrieveSlice";
import { store } from "../../store";
import { QueryResultSeries } from "../../utils/types";

const LoadSeriesCSV = () => {
    const [series, setSeries] = useState([]);
    const [loadedSeries, setLoadededSeries] = useState(0);

    const onImportCSVHandler = (records) => {
        const importedSeries: QueryResultSeries[] = records.map((record: any) => ({
            id: Math.random(),
            patientName: record.patientName,
            patientId: record.patientId,
            studyDescription: record.studyDescription,
            accessionNumber: record.accessionNumber,
            dateFrom: record.dateFrom,
            dateTo: record.dateTo,
            modality: record.modality,
            originAET: record.aet,
            seriesInstanceUID: record.seriesInstanceUID,
            studyInstanceUID: record.studyInstanceUID,
            seriesDescription: record.seriesDescription,
            seriesNumber: record.seriesNumber,
            numberOfSeriesRelatedInstances: record.numberOfSeriesRelatedInstances,
        }));
        setSeries(importedSeries);
    }

    const onLoadHandler = async () => {
        setLoadededSeries(0);
        for (const currentSeries of series) {

            const query: QueryPayload = {
                Level: 'Series',
                Query: {
                    StudyInstanceUID: currentSeries.studyInstanceUID,
                    SeriesInstanceUID: currentSeries.seriesInstanceUID,
                }
            }
            const answer = await (queryModality(currentSeries.originAET, query) as Promise<QueryResultSeries[]>)
            if (answer.length == 1) store.dispatch(addSeriesResult(answer[0]));
            setLoadededSeries((loaded) => loaded + 1);

        }

    }

    return (
        <div className="flex flex-col gap-3">
            <CsvDrop onImportCsv={onImportCSVHandler} />
            <LoadSeriesTable resultSeries={series} />
            <div className="flex flex-col justify-center gap-2">
                <Button disabled={loadedSeries > 0} onClick={onLoadHandler} color={Colors.primary}>Load</Button>
                {loadedSeries > 0 && <>
                    <BannerAlert color={Colors.warning}>Querying & Loading, please keep opened until completion</BannerAlert>
                    <ProgressBar progress={(loadedSeries / (series.length + Number.EPSILON)) * 100}></ProgressBar>
                </>}
            </div>
        </div>
    );
}

export default LoadSeriesCSV;