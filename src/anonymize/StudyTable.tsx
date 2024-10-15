import { Button, Input, Table } from "../ui";
import { Colors } from "../utils";
import { Trash } from "../icons";
import { ColumnDef } from "@tanstack/react-table";
import { AnonStudy } from "../utils/types";

type StudyTableProps = {
    studies: AnonStudy[];
    onChangeStudy: (studyId: string, studyDescription: string) => void;
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
            accessorKey: "newStudyDescription",
            header: "New Study Description",
            cell: ({ row }) => {
                return (
                    <Input
                        key={row.original.originalStudy.id}
                        value={row.original.newStudyDescription ?? ""}
                        onChange={(event) =>
                            onChangeStudy(
                                row.original.originalStudy.id,
                                event.target.value
                            )
                        }
                    />
                );
            },
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
        data={studies} columnVisibility={{ id: false }}
        headerTextSize="xs"
        className="text-xs"

    />;

};

export default StudyTable;
