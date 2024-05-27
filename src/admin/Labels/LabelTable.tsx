import React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { BsPencilFill as Edit, BsTrashFill as Delete } from "react-icons/bs";

import { Table, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';



interface LabelsProps{
    data: LabelResponse[];
    onEdit: (labelId: number) => void; 
    onDelete: (labelId: number) => void; 
};

const LabelsTable = ({ data = [], onEdit, onDelete }: LabelsProps) => {
    const columns = [
        {
            header: "Label",
            accessorKey: "Label",
            enableColumnFilters: true,
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
                            onClick={() => onEdit(labelId)}
                        />
                        <Delete
                            size="1.3rem"
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={() => onDelete(labelId)} 
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
