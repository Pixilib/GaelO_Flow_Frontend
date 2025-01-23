import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { QueryStudy } from "../types";

type QueryCsvDropProps = {
  onImportCsv: (records: QueryStudy[]) => void;
};

const QueryCsvDrop = ({ onImportCsv }: QueryCsvDropProps) => {
    
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const csvString = await acceptedFiles[0].text();
      const records = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
      }).data;

      const queries = records.map((record: any) => ({
        id: Math.random(),
        patientName: record.patientName,
        patientID: record.patientID,
        studyDescription: record.studyDescription,
        accessionNumber: record.accessionNumber,
        dateFrom: record.dateFrom,
        dateTo: record.dateTo,
        modalitiesInStudy: record.modalitiesInStudy,
        aet: record.aet,
      }));
      onImportCsv(queries);
    },
  });

  return (
    <>
      <div
        {...getRootProps({ onClick: open })}
        className={`relative flex flex-col space-y-3 items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 dark:bg-neutral-800 border-4 border-dashed border-primary dark:border-white rounded-lg`}
      >
        <p className="text-primary dark:text-white">Drop CSV</p>
        <input {...getInputProps()} />
      </div>
    </>
  );
};
export default QueryCsvDrop;
