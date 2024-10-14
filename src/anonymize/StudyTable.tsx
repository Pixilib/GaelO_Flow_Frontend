import { Button, Table } from "../ui";
import { Colors } from "../utils";
import { Trash } from "../icons";
import { ColumnDef } from "@tanstack/react-table";
import { AnonStudy } from "../utils/types";
import { useMemo } from "react";

type StudyTableProps = {
    studies: AnonStudy[];
    onRemoveStudy: (studyId: string) => void;
    onCellEdit: (studyId: string | number, columnId: any, value: any) => void
};

const StudyTable = ({ studies, onRemoveStudy, onCellEdit }: StudyTableProps) => {
    const columns: ColumnDef<AnonStudy>[] = useMemo(() => [
        {
            id: "id",
            accessorFn: (row)=> row.originalStudy.id,
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
            header: "New Study Description",
            isEditable: true
        },
        {
            header: "Remove",
            cell: ({ row }) => {
                return (
                    <Button
                        color={Colors.danger}
                        onClick={() =>
                            onRemoveStudy(row.original.originalStudy.id)
                        }
                    >
                        <Trash />
                    </Button>
                );
            },
        },
    ], []);

    return <Table id={"id"} columns={columns} data={studies} columnVisibility={{ id: false }} onCellEdit={onCellEdit} />;
};

export default StudyTable;
