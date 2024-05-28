import React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { BsPencilFill as Edit, BsTrashFill as Delete } from "react-icons/bs";

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


const LabelsTable : React.FC<LabelsTableProps> =  ({ data = [], onEditLabel, onDeleteLabel }: LabelsTableProps) => {
    const columns = [
        {
            header: "Label",
            accessorKey: "Label",
            enableColumnFilters: true,
            cell: (info: { getValue: () => string; }) => <Badge value={info.getValue() as string} />
        },
        {
            header: "Actions",
            accessorKey: "actions",
            enableColumnFilters: false,
            Cell: ({ row }: { row: any }) => {
                const labelId = row.original.Id; 

                return (
                    <div className="flex justify-center gap-7">
                        <Edit
                            size="1.3rem"
                            className="transition duration-70 hover:scale-110"
                            color="#DFB520"
                            onClick={() => onEditLabel(labelId)}
                        />
                        <Delete
                            size="1.3rem"
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={() => onDeleteLabel(labelId)} 
                        />
                    </div>
                );
            },
        },
    ];

    return <
        Table columns={columns} 
        data={data} 
        headerColor={Colors.almond} 
        enableColumnFilters enableSorting 
        />;
};

export default LabelsTable;
