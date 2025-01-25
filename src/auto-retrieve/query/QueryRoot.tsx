import { useMemo } from "react";
import Papa from "papaparse";
import QueryTable from "./QueryTable";
import { Colors } from "../../utils";
import { Button } from "../../ui";
import { Add, Download, Empty } from "../../icons";
import { QueryStudy } from "../types";
import { exportCsv } from "../../utils/export";
import QueryCsvDrop from "./QueryCsvDrop";
import { QueryResultStudy, QueryResultSeries } from "../../utils/types";
import { addQuery, editQuery, removeQuery, updateQueriesSelection } from "../../reducers/AutoRetrieveSlice";
import { store } from "../../store";

type QueryRootProps = {
  queries: (QueryStudy & { selected: boolean })[];
  onStudyResults: (answer: QueryResultStudy[]) => void;
  onSeriesResults: (answer: QueryResultSeries[]) => void;
  onStartStudyQueries: () => void;
};

const QueryRoot = ({ queries, onStartStudyQueries }: QueryRootProps) => {

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
      patientID: "",
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
      patientID: query.patientID,
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

  const handleImportCsv = (importedQueries: QueryStudy[]) => {
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

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex gap-3 w-full justify-between">
        <div className="flex gap-3">
          <Button color={Colors.primary} onClick={addEmptyQuery}>
            <Add />
          </Button>
          <QueryCsvDrop onImportCsv={handleImportCsv} />
        </div>
        <div className="flex gap-3">
          <Button
            className="flex gap-3"
            color={Colors.success}
            onClick={onDownloadCSV}
          >
            <Download /> csv
          </Button>
        </div>
      </div>
      <div>
        <QueryTable
          queries={queries}
          onCellEdit={onCellEdit}
          onRowSelectionChange={handleRowSelectionChange}
          selectedRow={selectedRow}
        />
      </div>
      <div className="flex justify-center m-3 gap-3">
        <Button color={Colors.primary} onClick={onStartStudyQueries}>Start Queries</Button>
        <Button color={Colors.warning} onClick={onRemoveQueryList}>
          <Empty />
        </Button>
      </div>
    </div>
  );
};

export default QueryRoot;
