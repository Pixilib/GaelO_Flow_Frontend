import moment from "moment";
import { Button, Table } from "../../ui";

const ResultStudiesTable = () => {
    const columns = [
        {
            id: "id",
            accessorKey: "id",
        },
        {
            id: "patientName",
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            id: "patientID",
            accessorKey: "patientID",
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
            id: "numberOfSeriesRelatedInstances",
            accessorKey: "numberOfSeriesRelatedInstances",
            header: "Number of Instances",
        },
        {
            id: "aet",
            accessorKey: "aet",
            header: "AET",
        },

    ]

    return (
        <Table
        columns={columns}
        columnVisibility={{ id: false, studyInstanceUID: false }}
        data={resultStudies}
      />
    )
}

export default ResultStudiesTable;