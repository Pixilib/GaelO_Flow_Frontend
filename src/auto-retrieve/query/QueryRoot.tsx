import { useMemo } from "react";
import Papa from "papaparse";
import QueryTable from "./QueryTable";
import { Colors, useCustomQuery } from "../../utils";
import { Button, Spinner } from "../../ui";
import { Add, Download, Empty } from "../../icons";
import { QueryStudy } from "../types";
import { exportCsv } from "../../utils/export";
import CsvDrop from "./CsvDrop";
import { QueryResultStudy, QueryResultSeries, ModalityExtended, Option } from "../../utils/types";
import { addQuery, editQuery, removeQuery, updateQueriesSelection } from "../../reducers/AutoRetrieveSlice";
import { store } from "../../store";
import { getModalities } from "../../services";
import QueriesTour from "../../tour/tours/auto-retrieve/QueriesTour";

type QueryRootProps = {
  queries: (QueryStudy & { selected: boolean })[];
  onStudyResults: (answer: QueryResultStudy[]) => void;
  onSeriesResults: (answer: QueryResultSeries[]) => void;
  onStartStudyQueries: () => void;
};

const QueryRoot = ({ queries, onStartStudyQueries }: QueryRootProps) => {

  const { data: aetOptions, isPending } = useCustomQuery<ModalityExtended[], Option[]>(
    ['modalities'],
    () => getModalities(),
    {
      select: (response) => response.map((modality) => ({
        value: modality.name,
        label: modality.aet,
      })),
    }
  );

  const selectedRow: Record<number, boolean> = useMemo(() => {
    return queries.reduce((acc, query, index) => {
      acc[query.id] = query.selected;
      return acc;
    }, {});
  }, [queries]);

  const addEmptyQuery = () => {
    store.dispatch(addQuery({
      id: Math.random(),
      patientName: "",
      patientId: "",
      dateFrom: "",
      dateTo: "",
      modalitiesInStudy: "",
      studyDescription: "",
      accessionNumber: "",
      aet: "",
    }));
  };

  const onCellEdit = (rowIndex, columnId, value) => {
    store.dispatch(editQuery({ id: rowIndex, key: columnId, value }));
  };

  const onDownloadCSV = () => {
    const payload = queries.map((query) => ({
      patientName: query.patientName,
      patientId: query.patientId,
      studyDescription: query.studyDescription,
      accessionNumber: query.accessionNumber,
      dateFrom: query.dateFrom,
      dateTo: query.dateTo,
      modalitiesInStudy: query.modalitiesInStudy,
      aet: query.aet,
    }));
    const csvString = Papa.unparse(payload);
    exportCsv(csvString, ".csv", "auto-queries.csv");
  };

  const handleImportCsv = (records: Record<string, any>[]) => {
    const importedQueries: QueryStudy[] = records.map((record: any) => ({
      id: Math.random(),
      patientName: record.patientName,
      patientId: record.patientId,
      studyDescription: record.studyDescription,
      accessionNumber: record.accessionNumber,
      dateFrom: record.dateFrom,
      dateTo: record.dateTo,
      modalitiesInStudy: record.modalitiesInStudy,
      aet: record.aet,
    }));
    importedQueries.forEach((query) => {
      store.dispatch(addQuery(query));
    });
  };

  const onRemoveQueryList = () => {
    for (const [index, selected] of Object.entries(selectedRow)) {
      if (selected) {
        store.dispatch(removeQuery({ id: Number(index) }));
      }
    }
  };

  const handleRowSelectionChange = (selectedState: Record<number, boolean>) => {
    store.dispatch(updateQueriesSelection(selectedState));
  }

  if (isPending) return <Spinner />

  return (
    <>
    <div className="w-full flex justify-end m-1">
      <QueriesTour />
    </div>
    <div className="flex flex-col gap-3 p-3">
      <div className="flex gap-3 w-full justify-between">
        <div className="flex gap-3">
          <Button data-gaelo-flow="query-addLine" color={Colors.primary} onClick={addEmptyQuery}>
            <Add />
          </Button>
          <div data-gaelo-flow="query-dropCSV">
            <CsvDrop onImportCsv={handleImportCsv} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            data-gaelo-flow="query-downloadCSV"
            className="flex gap-3"
            color={Colors.success}
            onClick={onDownloadCSV}
          >
            <Download /> csv
          </Button>
        </div>
      </div>
      <div data-gaelo-flow="query-datatable">
        <QueryTable
          aets={aetOptions}
          queries={queries}
          onCellEdit={onCellEdit}
          onRowSelectionChange={handleRowSelectionChange}
          selectedRow={selectedRow}
        />
      </div>
      <div className="flex justify-center m-3 gap-3">
        <Button data-gaelo-flow="query-start" color={Colors.primary} onClick={onStartStudyQueries}>Start Queries</Button>
        <Button data-gaelo-flow="query-delete" color={Colors.warning} onClick={onRemoveQueryList}>
          <Empty />
        </Button>
      </div>
    </div>
  </>
  );
};

export default QueryRoot;
