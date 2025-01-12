import moment from "moment";
import { Table } from "../../ui";

type ResultStudiesTableProps = {
    resultStudies: any;
}
const ResultStudiesTable = ({ resultStudies }: ResultStudiesTableProps) => {
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
            id: "studyInstanceUID",
            accessorKey: "studyInstanceUID",
        },
        {
            id: "studyDate",
            accessorFn: (row) => {
                return moment(row.studyDate, "YYYYMMDD", true)?.toDate();
            },
            cell: ({row}) => {
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
            id: "numberOfStudyRelatedSeries",
            accessorKey: "numberOfStudyRelatedSeries",
            header: "Number of Series",
        },
        {
            id: "numberOfStudyRelatedInstances",
            accessorKey: "numberOfStudyRelatedInstances",
            header: "Number of Instances",
        },
        {
            id: "originAET",
            accessorKey: "originAET",
            header: "AET",
        },

    ]

    return (
        <Table
            columns={columns}
            columnVisibility={{ id: false, answerNumber:false, studyInstanceUID: false }}
            data={resultStudies}
        />
    )
}

export default ResultStudiesTable;