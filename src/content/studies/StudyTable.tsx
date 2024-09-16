import React, { useMemo } from "react";
import { ColumnDef, selectRowsFn } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../../utils/types";
import { Colors } from "../../utils";

import { Table } from "../../ui";
import StudyActions from "./StudyActions";

type StudyWithId = StudyMainDicomTags & { id: string }

type StudyTableProps = {
    studies: StudyWithId[];
    selectedRows?: Record<string, boolean>;
    onRowClick?: (studyId: string) => void;
    onActionClick: (action: string, studyId: string) => void;
    onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void
};

const  StudyTable: React.FC<StudyTableProps> = ({
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

    return (
        <Table
            columns={columns}
            data={studies}
            enableColumnFilters={true}
            headerColor={Colors.almond}
            className="text-[10px]"
            onRowClick={(row) => onRowClick(row.id)}
            enableSorting={true}
            enableRowSelection={true}
            selectedRow={selectedRows}
            onRowSelectionChange={onRowSelectionChange}
        />
    );
};

export default StudyTable;
