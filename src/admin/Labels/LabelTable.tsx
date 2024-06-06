import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { RiAdminFill as EditIcon } from "react-icons/ri";
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { Table, Badge, Button } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../utils/types";

interface LabelsTableProps {
    data: Label[];
    onDeleteLabel: (labelName: string) => void;
}

const LabelsTable: React.FC<LabelsTableProps> = ({
    data = [],
    onDeleteLabel,
}) => {
    const columns: ColumnDef<Label>[] = [
        {
            accessorKey: "name",
            header: "Label",
            cell: (info) => <Badge value={info.getValue() as string} />,
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const labelId = row.original.Name;
                return (
                    <div className="flex justify-center gap-2.5">
                        <Button
                            color={Colors.secondary}
                        >
                            <EditIcon
                                size="1.3rem"
                                className="transition duration-70 hover:scale-110"
                                color={Colors.light}
                            />
                        </Button>
                        <Button
                            onClick={() => onDeleteLabel(labelId)}
                            color={Colors.danger}
                        >
                            <DeleteIcon
                                size="1.3rem"
                                className="transition duration-70 hover:scale-110"
                                color={Colors.light}
                            />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Table
            columns={columns}
            data={data}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
        />
    );
};

export default LabelsTable;
