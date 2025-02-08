import moment from "moment";
import { Table } from "../../ui";

type ResultSeriesTableProps = {
    resultSeries: any;
    onRowSelectionChange: (selectedState: Record<string, boolean>) => void;
    selectedRow: Record<string, boolean>;
}
const ResultSeriesTable = ({ resultSeries, onRowSelectionChange, selectedRow }: ResultSeriesTableProps) => {
    const columns = [
        {
            id: "answerId",
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
            filterType: 'MULTISELECT',
            filterFn : 'arrIncludesSome',
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
            filterType: 'MULTISELECT',
            filterFn : 'arrIncludesSome',
        },
        {
            id: "seriesDescription",
            accessorKey: "seriesDescription",
            header: "Series Description",
            filterType: 'MULTISELECT',
            filterFn : 'arrIncludesSome',
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
            filterType: 'MULTISELECT',
            filterFn : 'arrIncludesSome',
        }
    ]

    return (
        <Table
            id="seriesInstanceUID"
            enableRowSelection
            enableColumnFilters
            enableSorting
            columns={columns}
            columnVisibility={{ answerId: false, answerNumber: false, studyInstanceUID: false, seriesInstanceUID: false }}
            data={resultSeries}
            onRowSelectionChange={onRowSelectionChange}
            selectedRow={selectedRow}
        />
    )
}

export default ResultSeriesTable;