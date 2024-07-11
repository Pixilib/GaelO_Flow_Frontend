import { useMemo } from "react";
import { Table } from "../ui";
import { Colors } from "../utils";
import { ColumnDef } from "@tanstack/react-table";

type StudyTableProps = {
    studies: any[];
    onRowClick: (studyInstanceUID: string, originAET: string) => void;
};

const StudyTable = ({ studies, onRowClick }: StudyTableProps) => {
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
        }
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

export default StudyTable;
