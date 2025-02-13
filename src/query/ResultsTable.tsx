import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResultStudy } from "../utils/types";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';
import { useMemo, useState } from "react";

type ResultsTableProps = {
    results: QueryResultStudy[] | null;
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
};

const ResultsTable = ({ results, onRowClick }: ResultsTableProps) => {
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
    
    const columns: ColumnDef<QueryResultStudy>[] =  [
        {
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            accessorKey: "accessionNumber",
            header: "Accession Number",
        },
        {
            accessorKey: "patientId",
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
                    <div className="flex justify-center">
                        <RetrieveButton
                            answerId={row.original.answerId}
                            answerNumber={row.original.answerNumber}
                        />
                    </div>
                );
            }
        },
    ];

    const handleRowClick = (row: QueryResultStudy) => {
        onRowClick(row.studyInstanceUID, row.originAET);
        setSelectedRows(prev => ({
            [row.studyInstanceUID]: !prev[row.studyInstanceUID] // Toggle selection
        }));
    };

    const getRowClasses = (row: QueryResultStudy) => {
        if (selectedRows[row.studyInstanceUID]) {
            return 'bg-primary text-white hover:cursor-pointer';
        }
        return 'hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:cursor-pointer';
    };

    return (
        <Table
            columns={columns}
            data={results ?? []}
            enableColumnFilters={true}
            onRowClick={handleRowClick}
            getRowClasses={getRowClasses}
            headerTextSize="xs"
            headerColor={Colors.white} 
            className="bg-gray-100"
        />
    );
};

export default ResultsTable;
