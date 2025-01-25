import moment from "moment";
import { Table } from "../../ui";
import { QueryResultSeries, QueryResultStudy } from "../../utils/types";

type BasketTableProps = {
    queryResults: Array<QueryResultStudy | QueryResultSeries>
    onRowSelectionChange: (selectedState: Record<string, boolean>) => void;
    selectedRow: Record<string, boolean>;
}
const BasketTable = ({ queryResults, onRowSelectionChange, selectedRow }: BasketTableProps) => {
    const columns = [
        {
            id: "id",
            accessorFn: (row) => {
                return row.answerId+'/'+row.answerNumber;
            }
        },
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
            id: "modalitiesInStudy",
            accessorKey: "modalitiesInStudy",
            header: "Modalities",
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
            id: "numberOfStudyRelatedSeries",
            accessorKey: "numberOfStudyRelatedSeries",
            header: "Number of Series",
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
            enableRowSelection
            enableColumnFilters
            enableSorting
            columns={columns}
            columnVisibility={{ id : false, answerId: false, answerNumber: false, studyInstanceUID: false, seriesInstanceUID: false }}
            data={queryResults}
            onRowSelectionChange={onRowSelectionChange}
            selectedRow={selectedRow}
        />
    )
}

export default BasketTable;