import { useMemo } from "react";
import { RetrieveButton, Table } from "../ui";
import { Colors } from "../utils";
import { ColumnDef } from "@tanstack/react-table";

type StudiesTableProps = {
    studies: any[];
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
};

const StudiesTable = ({ studies, onRowClick }: StudiesTableProps) => {
    const rows = useMemo(() => studies, [studies]);

    const columns: ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: "accessionNumber",
            header: "Accession Number",
        },
        {
            accessorKey: "studyDate",
            header: "Acquisition Date",
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
    ], []);

    const handleRowClick = (row: any) => {
        onRowClick(row.studyInstanceUID, row.originAET);
    };

    return (
        <Table
            columns={columns}
            data={rows ?? []}
            enableColumnFilters={true}
            headerColor={Colors.almond}
            headerTextSize="xs"
            className="text-xs"
            onRowClick={handleRowClick}
            enableSorting={true}
        />
    );
};

export default StudiesTable;
