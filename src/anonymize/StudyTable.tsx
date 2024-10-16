import { Button, Input, Table } from "../ui";
import { Colors } from "../utils";
import { Trash } from "../icons";
import { ColumnDef } from "@tanstack/react-table";
import { AnonStudy } from "../utils/types";

type StudyTableProps = {
    studies: AnonStudy[];
    onChangeStudy: (studyId: string, key:string, value: string) => void;
    onRemoveStudy: (studyId: string) => void;
};

const StudyTable = ({ studies, onChangeStudy, onRemoveStudy }: StudyTableProps) => {
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
            id : "newStudyDescription",
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
                        onClick={() =>
                            onRemoveStudy(row.original.originalStudy.id)
                        }
                    >
                        <Trash />
                    </Button>
                );
            },
        },
    ];

    return <Table
        columns={columns}
        data={studies} 
        columnVisibility={{ id: false }}
        headerTextSize="xs"
        className="text-xs"
        onCellEdit={onChangeStudy}
        getRowId={(row) => row.originalStudy.id}

    />;

};

export default StudyTable;
