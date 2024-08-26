import React, { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../../utils/types";
import { Colors } from "../../utils";

import { Table } from "../../ui";
import StudyActions from "./DatasetStudyActions";

type StudyWithId = StudyMainDicomTags & { id: string }

type StudyTableProps = {
    studies: StudyWithId[];
    onRowClick: (studyId: string) => void;
    onActionClick: (action: string, studyId: string) => void;
};

const DatasetTableStudy: React.FC<StudyTableProps> = ({
    studies,
    onRowClick,
    onActionClick,
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
            headerColor={Colors.white}
            headerTextSize="xxs"
            className="text-xs bg-gray-100"
            onRowClick={(row) => onRowClick(row.id)}
            enableSorting={true}
            enableRowSelection={true}
        />
    );
};

export default DatasetTableStudy;
