import { Table } from "../ui";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResponse } from "../utils/types";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';

type ResultsTableProps = {
    results: QueryResponse[] | null;
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
};

const ResultsTable = ({ results, onRowClick }: ResultsTableProps) => {
    const columns: ColumnDef<QueryResponse>[] = [
        {
            accessorKey: "patientName",
            header: "Patient Name",
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
            header: "Action",
            cell: ({ row }: { row: any }) => {
                return (
                    <div className="flex justify-center">
                        <RetrieveButton
                            answerId={row.original.AnswerId}
                            answerNumber={row.original.AnswerNumber}
                        />
                    </div>
                );
            }
        },
    ];

    const handleRowClick = (row: any) => {
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
            className="text-xs"
        />
    );
};

export default ResultsTable;
