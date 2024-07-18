import { useMemo } from "react";
import { Table } from "../ui";
import { Colors } from "../utils";
import { ColumnDef } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../utils/types";

type StudyTableProps = {
    studies: any[];
    onRowClick: (row:any) => void;
};

const StudyTable = ({ studies, onRowClick }: StudyTableProps) => {
    console.log(studies)
    const rows = useMemo(() => studies, [studies]);

    const columns: ColumnDef<StudyMainDicomTags>[] = useMemo(() => [
        {
            accessorKey: "id",
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
        console.log(row);
        onRowClick(row);
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
