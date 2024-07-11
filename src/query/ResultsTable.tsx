import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResponse } from "../utils/types";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';
import { useMemo } from "react";

type ResultsTableProps = {
    results: QueryResponse[] | null;
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
};

const ResultsTable = ({ results, onRowClick }: ResultsTableProps) => {
    const rows = useMemo(() => results, [results]);
    
    const columns: ColumnDef<QueryResponse>[] = useMemo(() => [
        {
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            accessorKey: "accessionNumber",
            header: "Accession Number",
        },
        {
            accessorKey: "patientID",
            header: "Patient ID",
        },
        {
            accessorKey: "studyDate",
            header: "Study Date",
        },
        {
            accessorKey: "studyDescription",
            header: "Study Description",
        },
        {
            header: "Retrieve",
            cell: ({ row }: { row: any }) => {
                return (
                    <div
                        className="flex justify-center"
                    >
                        <RetrieveButton
                            answerId={row.original.answerId}
                            answerNumber={row.original.answerNumber}
                        />
                    </div>
                );
            }
        },
    ], []);
    
    const handleRowClick = (row: any) => {
        onRowClick(row.studyInstanceUID, row.originAET);
    };
    return (
        <Table
            columns={columns}
            data={rows ?? []}
            enableColumnFilters={true}
            onRowClick={handleRowClick}
            headerTextSize="xs"
            headerColor={Colors.white} 
            className="bg-gray-100"
        />
    );
};

export default ResultsTable;
