import moment from "moment";
import { Table } from "../../ui";

type LoadSeriesTableProps = {
    resultSeries: any;
}
const LoadSeriesTable = ({ resultSeries }: LoadSeriesTableProps) => {
    const columns = [
        {
            id: "patientName",
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            id: "patientId",
            accessorKey: "patientId",
            header: "Patient ID",
        },
        {
            id: "studyDescription",
            accessorKey: "studyDescription",
            header: "Study Description",
        },
        {
            id: "accessionNumber",
            accessorKey: "accessionNumber",
            header: "Accession Number",
        },
        {
            id: "studyDate",
            accessorFn: (row) => {
                return moment(row.studyDate, "YYYYMMDD", true)?.toDate();
            },
            cell: ({ getValue }) => {
                return (
                    moment(getValue() as Date).format("YYYY-MM-DD")
                );
            },
            header: "Study Date",
        },
        {
            id: "modality",
            accessorKey: "modality",
            header: "Modality",
        },
        {
            id: "seriesDescription",
            accessorKey: "seriesDescription",
            header: "Series Description",
        },
        {
            id: "studyInstanceUID",
            accessorKey: "studyInstanceUID",
        },
        {
            id: "seriesInstanceUID",
            accessorKey: "seriesInstanceUID",
        },
        {
            id: "originAET",
            accessorKey: "originAET",
            header: "AET",
        }
    ]

    return (
        <Table
            id="seriesInstanceUID"
            enableSorting
            columns={columns}
            columnVisibility={{ studyInstanceUID: false, seriesInstanceUID: false }}
            data={resultSeries}
        />
    )
}

export default LoadSeriesTable;