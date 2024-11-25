import { Button, Input, Table } from "../ui";
import { Colors } from "../utils";
import { Trash } from "../icons";
import { ColumnDef } from "@tanstack/react-table";
import { AnonStudy } from "../utils/types";

type StudyTableProps = {
    studies: AnonStudy[];
    onChangeStudy: (studyId: string, key: string, value: string) => void;
    onRemoveStudy: (studyId: string) => void;
    selectedRows?: Record<string, boolean>;
};

const StudyTable = ({ studies, onChangeStudy, onRemoveStudy, selectedRows }: StudyTableProps) => {
    const columns: ColumnDef<AnonStudy>[] = [
        {
            id: "id",
            accessorKey: "originalStudy.id",
        },
        {
            accessorKey: "originalStudy.mainDicomTags.studyDate",
            header: "Acquisition Date",
        },
        {
            accessorKey: "originalStudy.mainDicomTags.studyDescription",
            header: "Study Description",
        },
        {
            id: "newStudyDescription",
            accessorKey: "newStudyDescription",
            header: "New Study Description",
            isEditable: true,
        },
        {
            header: "Remove",
            cell: ({ row }) => {
                return (
                    <Button
                        color={Colors.danger}
                        onClick={() => onRemoveStudy(row.original.originalStudy.id)}
                    >
                        <Trash />
                    </Button>
                );
            },
        },
    ];

    const getRowClasses = (row: AnonStudy) => {
        if (selectedRows?.[row.originalStudy.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer dark:hover:bg-indigo-700';
        }
    };

    return (
        <Table
            columns={columns}
            data={studies}
            columnVisibility={{ id: false }}
            headerTextSize="xs"
            className="text-xs bg-gray-100 dark:bg-slate-950 dark:text-white"
            onCellEdit={onChangeStudy}
            getRowId={(row) => row.originalStudy.id}
            getRowClasses={getRowClasses}
        />
    );
};

export default StudyTable;
