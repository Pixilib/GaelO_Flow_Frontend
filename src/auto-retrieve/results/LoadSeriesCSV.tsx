import CsvDrop from "../query/CsvDrop";

const LoadSeriesCSV = () => {
    const onImportCSVHandler = (records) => {
        console.log(records);
    }
    return (
        <>
            <CsvDrop onImportCsv={onImportCSVHandler} />
        </>
    );
}

export default LoadSeriesCSV;