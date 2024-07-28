import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils";
import { ColumnDef } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../../utils/types";
import EntityActions from "../EntityAction";
import { FaEdit, FaTrash } from "react-icons/fa";

type StudyTableProps = {
    studies: any[];
    onRowClick: (row: StudyMainDicomTags) => void;
    onActionClick: (action: string, study: StudyMainDicomTags) => void;
};

const StudyTable: React.FC<StudyTableProps> = ({
    studies,
    onRowClick,
    onActionClick,
}) => {

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
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const study = row.original;
                const options = [
                    {
                        label: 'Modify',
                        icon: <FaEdit />,
                        color: 'orange',
                        action: () => onActionClick('edit', study)
                    },
                    {
                        label: 'Delete',
                        icon: <FaTrash />,
                        color: 'red',
                        action: () => onActionClick('delete', study)
                    },
                ];
                return <EntityActions entity={study} options={options} />;
            },
        },

    ], [onActionClick]);

    return (
        <Table
            columns={columns}
            data={studies}
            enableColumnFilters={true}
            headerColor={Colors.almond}
            headerTextSize="xxs"
            className="text-[10px]"
            onRowClick={onRowClick}
            enableSorting={true}
        />
    );
};

export default StudyTable;
