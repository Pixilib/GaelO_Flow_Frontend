import React, { useMemo } from "react";
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { Table, Button, Label, Popover } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label as LabelType } from "../../utils/types";
import LabelsRoles from "./LabelsRoles";

interface LabelsTableProps {
    data: LabelType[];
    onDeleteLabel: (labelName: string) => void;
}

const LabelsTable: React.FC<LabelsTableProps> = ({ data = [], onDeleteLabel }) => {

    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "Name",
                header: "Label",
                cell: (info) => <Label value={info.getValue() as string} />
            },
            {
                header: "Actions",
                id: "actions",
                cell: ({ row }) => (
                    <div className="flex justify-center gap-2.5">
                        <Popover withOnClick={true} popover={<LabelsRoles key={row.original.Name} labelName={row.original.Name} />}>
                            <Button color={Colors.primary}>Edit Roles</Button>
                        </Popover>

                        <Button
                            onClick={() => onDeleteLabel(row.original.Name)}
                            color={Colors.danger}
                        >
                            <DeleteIcon
                                size="1.3rem"
                                className="transition duration-70 hover:scale-110"
                                color={Colors.light}
                            />
                        </Button>
                    </div>
                ),
            },
        ];
    }, []);

    return (
        <Table
            columns={columns}
            data={rows}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
        />
    );
};

export default LabelsTable;
