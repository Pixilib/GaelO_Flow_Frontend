import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../../utils/types";
import { Colors } from "../../utils";
import { Table } from "../../ui";
import StudyActions from "./StudyActions";

type StudyWithId = StudyMainDicomTags & { id: string };

type StudyTableProps = {
    studies: StudyWithId[];
    selectedRows?: Record<string, boolean>;
    onRowClick?: (studyId: string) => void;
    onActionClick: (action: string, studyId: string) => void;
    onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void;
};

const StudyTable: React.FC<StudyTableProps> = ({
    studies,
    selectedRows,
    onRowClick,
    onActionClick,
    onRowSelectionChange,
}) => {
    const columns: ColumnDef<StudyWithId>[] = useMemo(() => [
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
            header: "Actions",
            cell: ({ row }) => {
                const study = row.original;
                return <StudyActions study={study} onActionClick={onActionClick} />;
            },
        },
    ], [onActionClick]);

    const getRowClasses = (row: StudyWithId) => {
        if (selectedRows?.[row.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer dark:hover:bg-indigo-700';
        }
    };

    return (
        <Table
            columns={columns}
            data={studies}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="bg-gray-100 dark:bg-slate-950 dark:text-white"
            getRowClasses={getRowClasses}
            onRowClick={(row) => onRowClick && onRowClick(row.id)}
            enableSorting={true}
            enableRowSelection={true}
            selectedRow={selectedRows}
            onRowSelectionChange={onRowSelectionChange}
        />
    );
};

export default StudyTable;
