import { useState } from "react";
import Papa from "papaparse";
import QueryTable from "./QueryTable";
import { Colors } from "../../utils";
import { Button } from "../../ui";
import { Add, Download, Empty } from "../../icons";
import { QueryStudy } from "../types";
import { exportCsv } from "../../utils/export";
import QueryCsvDrop from "./QueryCsvDrop";

const QueryRoot = () => {
  const [queries, setQueries] = useState<QueryStudy[]>([]);

  const addEmptyQuery = () => {
    setQueries((queries) => {
      queries.push({
        id: Math.random(),
        patientName: "",
        patientID: "",
        dateFrom: "",
        dateTo: "",
        modalitiesInStudy: "",
        studyDescription: "",
        accessionNumber: "",
        aet: "",
      });
      return [...queries];
    });
  };

  const onCellEdit = (rowIndex, columnId, value) => {
    setQueries((queries) => {
      queries.forEach((query) => {
        if (query.id === rowIndex) {
          query[columnId] = value ?? "";
        }
      });
      return [...queries];
    });
  };

  const onRemoveQuery = (id) => {
    setQueries((queries) => queries.filter((query) => query.id !== id));
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
    setQueries((queries) => [...queries, ...importedQueries]);
  };

  const onEmptyQueryList = () => {
    setQueries([]);
  };

  const onStartQueries = () => {
    //TODO
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex gap-3 w-full justify-between">
        <div className="flex gap-3">
          <Button color={Colors.warning} onClick={addEmptyQuery}>
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
          <Button color={Colors.danger} onClick={onEmptyQueryList}>
            <Empty />
          </Button>
        </div>
      </div>
      <div>
        <QueryTable
          queries={queries}
          onCellEdit={onCellEdit}
          onRemoveRow={onRemoveQuery}
        />
      </div>
      <div className="flex justify-center m-3">
        <Button color={Colors.primary} onClick={onStartQueries}>Start Queries</Button>
      </div>
    </div>
  );
};

export default QueryRoot;
