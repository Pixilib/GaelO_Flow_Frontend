import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResponse } from "../utils/types";
import { Colors } from "../utils";

type ResultsTableProps = {
    results: QueryResponse[] | null;
    onRowClick: (row: string) => void;
};
const ResultsTable = ({ results, onRowClick }: ResultsTableProps) => {

    const columns: ColumnDef<QueryResponse>[] = [
        {
            accessorKey: "PatientName",
            header: "Patient Name",
        },
        {
            accessorKey: "PatientID",
            header: "Patient ID",
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
                console.log(row)
                onRowClick(row.StudyInstanceUID)
            }}
            headerTextSize="xs"
        />
    );
}
export default ResultsTable;
