import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResponse } from "../utils/types";
import { Colors } from "../utils";

type ResultsTableProps = {
    results: QueryResponse[] | null;
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
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

    const handleRowClick = (row:any) => {
        onRowClick(row.StudyInstanceUID, row.OriginAET);
      };

    return (
        <Table
            columns={columns}
            data={results ?? []}
            headerColor={Colors.almond}
            enableColumnFilters={true}
            onRowClick={handleRowClick}
            headerTextSize="xs"
        />
    );
}
export default ResultsTable;
