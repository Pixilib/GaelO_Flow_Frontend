import moment from "moment";
import { Table } from "../../ui";

const ResultSeriesTable = () => {
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
                id: "seriesDescription",
                accessorKey: "seriesDescription",
                header: "Series Description",
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
                id: "seriesInstanceUID",
                accessorKey: "seriesInstanceUID",
            },
            {
                id: "studyDate",
                accessorFn: (row) => {
                    return moment(row.studyDate, "YYYYMMDD", true)?.toDate();
                },
                header: "Study Date",
            },
            {
                id: "modality",
                accessorKey: "modality",
                header: "Modality",
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
        columnVisibility={{ id: false, studyInstanceUID: false, seriesInstanceUID: false }}
        data={resultSeries}
      />
    )
}

export default ResultSeriesTable;