import moment from "moment";
import { Table } from "../../ui";
import { QueryResultSeries, QueryResultStudy } from "../../utils/types";

type BasketTableProps = {
    queryResults: Array<QueryResultStudy | QueryResultSeries>
}
const BasketTable = ({ queryResults }: BasketTableProps) => {
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
        <Table columns={columns}
            columnVisibility={{ id: false, answerNumber: false, studyInstanceUID: false, seriesInstanceUID: false }}
            data={queryResults}
        />
    )
}

export default BasketTable;