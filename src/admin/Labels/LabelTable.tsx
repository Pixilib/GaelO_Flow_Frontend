import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BsPencilFill as EditIcon, BsTrashFill as DeleteIcon } from "react-icons/bs";
import { Table, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';

interface Label {
    Id: number;
    Label: string;
}

interface LabelsTableProps {
    data: Label[];
    onEditLabel: (labelId: number) => void;
    onDeleteLabel: (labelId: number) => void;
}

const LabelsTable: React.FC<LabelsTableProps> = ({ data = [], onEditLabel, onDeleteLabel }) => {
    const columns: ColumnDef<Label>[] = [
        {
            accessorKey: 'Label',
            header: 'Label',
            cell: info => <Badge value={info.getValue() as string} />
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => {
                const labelId = row.original.Id;
                return (
                    <div className="flex justify-center gap-2.5">
                        <Button onClick={() => onEditLabel(labelId)} color={Colors.secondary}>
                            <EditIcon size="1.3rem" className="transition duration-70 hover:scale-110" color="#DFB520" />
                        </Button>
                        <Button onClick={() => onDeleteLabel(labelId)} color={Colors.danger}>
                            <DeleteIcon size="1.3rem" className="transition duration-70 hover:scale-110" color="#DF3B20" />
                        </Button>
                    </div>
                );
            }
        }
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
