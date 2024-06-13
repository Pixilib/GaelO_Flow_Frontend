import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { RiAdminFill as EditIcon } from "react-icons/ri";
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { Table, Button, Label } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label as LabelType } from "../../utils/types";
import LabelDropDown from "./LabelDropdown";
interface LabelsTableProps {
    data: LabelType[];
    onDeleteLabel: (labelName: string) => void;
}

const LabelsTable: React.FC<LabelsTableProps> = ({
    data = [],
    onDeleteLabel,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropDownOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        console.log("Selected Option:", option);
        setIsOpen(false);
    };

    const columns: ColumnDef<LabelType>[] = [
        {
            accessorKey: "Name",
            header: "Label",
            cell: (info) => <Label value={info.getValue() as string} />
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
                const labelId = row.original.Name;
                return (
                    <div className="flex justify-center gap-2.5">
                        <LabelDropDown
                            options={["Edit", "Delete"]}
                            onSelectOption={handleOptionSelect}
                            isOpen={isOpen}
                            dropDownOpen={handleDropDownOpen}
                        >
                            <Button
                                color={Colors.secondary}
                            >
                                <EditIcon
                                    size="1.3rem"
                                    className="transition duration-70 hover:scale-110"
                                    color={Colors.light}
                                />
                            </Button>
                        </LabelDropDown>
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
