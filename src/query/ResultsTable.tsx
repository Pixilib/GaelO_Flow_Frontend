import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryParseResponse } from "../utils/types";
import { Colors } from "../utils";

type ResultsTableProps = {
    results: QueryParseResponse[] | null;
    onRowClick: ( row:QueryParseResponse["StudyInstanceUID"] )=> void;
};
const ResultsTable = ({ results, onRowClick }: ResultsTableProps) => {

    const columns: ColumnDef<QueryParseResponse>[] = [
        {
            accessorKey: "PatientName",
            header: "Patient Name",
        },
        {
            accessorKey: "PatientID",
            header: "Patient ID",
        },
        {
            accessorKey: "AccessionNumber",
            header: "Accession Number",
        },
        {
            accessorKey: "StudyDate",
            header: "Study Date",
        },
        {
            accessorKey: "StudyDescription",
            header: "Study Description",
        },

    ]

    return (
        <Table
            columns={columns}
            data={results ?? []}
            headerColor={Colors.almond}
            enableColumnFilters={true}
            onRowClick={(row) => {
                console.log('ResultsTable - Row clicked:', row);
                onRowClick(row.StudyInstanceUID)
              }}
            headerTextSize="xs"
        />
    );
}
export default ResultsTable;
