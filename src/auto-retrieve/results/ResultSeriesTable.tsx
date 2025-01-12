import moment from "moment";
import { Table } from "../../ui";

type ResultSeriesTableProps = {
    resultSeries: any;
}
const ResultSeriesTable = ({ resultSeries }: ResultSeriesTableProps) => {
    const columns = [
        {
            id: "id",
            accessorKey: "answerId",
        },
        {
            id: "answerNumber",
            accessorKey: "answerNumber",
        },
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
            cell: ({ row }) => {
                return (
                    moment((row.studyDate as Date)).format("YYYY-MM-DD")
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
            id: "numberOfSeriesRelatedInstances",
            accessorKey: "numberOfSeriesRelatedInstances",
            header: "Number of Instances",
        },
        {
            id: "originAET",
            accessorKey: "originAET",
            header: "AET",
        }
    ]

    return (
        <Table
            columns={columns}
            columnVisibility={{ id: false, answerNumber: false, studyInstanceUID: false, seriesInstanceUID: false }}
            data={resultSeries}
        />
    )
}

export default ResultSeriesTable;