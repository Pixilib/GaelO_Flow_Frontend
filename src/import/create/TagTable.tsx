import React from 'react';
import { Input, Table } from '../../ui';
import { ColumnDef } from '@tanstack/react-table';
import DeleteButton from '../../ui/DeleteButton';
import { Colors } from '../../utils';
type TagTableProps = {
    data: { name: string, value: string }[];
    onDeleteTag: (tagName: string) => void;
};

const TagTable: React.FC<TagTableProps> = ({ data, onDeleteTag }) => {

    const columns: ColumnDef<{ name: string, value: string }>[] = [
        {
            accessorKey: 'name',
            header: 'Tag Name',
        },
        {
            accessorKey: 'value',
            header: 'Value',
        },
        {
            id: 'delete',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex justify-center w-full'>
                    <DeleteButton
                        onClick={() => onDeleteTag(row.original.name)}
                    />
                </div>

            )
        }
    ];

    return (
        <div className="w-full mt-4">
            <Table
                headerColor={Colors.light}
                columns={columns}
                data={data}
                className="bg-gray-100"
                enableSorting
            
            
            />
        </div>
    );
};

export default TagTable;
