import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";

type QueryCsvDropProps = {
  onImportCsv: (records: Record<string, any>[]) => void;
};

const QueryCsvDrop = ({ onImportCsv }: QueryCsvDropProps) => {
  const {t} = useTranslation()
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    onDrop: async (acceptedFiles) => {
      const csvString = await acceptedFiles[0].text();
      const records = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
      }).data;
      onImportCsv(records);
    },
  });

  return (
    <>
      <div
        {...getRootProps({ onClick: open })}
        className={`relative flex flex-col space-y-3 items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 dark:bg-neutral-800 border-4 border-dashed border-primary dark:border-white rounded-lg`}
      >
        <p className="text-primary dark:text-white">{t("auto-retrieve.query.Drop CSV")}</p>
        <input {...getInputProps()} />
      </div>
    </>
  );
};
export default QueryCsvDrop;
