import React from 'react';
import { Input, Table } from '../../ui';
import { ColumnDef } from '@tanstack/react-table';
import DeleteButton from '../../ui/DeleteButton';
import { Colors } from '../../utils';
type TagTableProps = {
    data: { TagName: string, Value: string }[];
    onDataUpdate: (tagName: string, columnId: string, value: string) => void;
    onDeleteTag: (tagName: string) => void;
};

const TagTable: React.FC<TagTableProps> = ({ data, onDataUpdate, onDeleteTag }) => {
    const handleInputChange = (tagName: string, columnId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        onDataUpdate(tagName, columnId, event.target.value);
    };

    const columns: ColumnDef<{ TagName: string, Value: string }>[] = [
        {
            accessorKey: 'TagName',
            header: 'Tag Name',
        },
        {
            accessorKey: 'Value',
            header: 'Value',
            cell: ({ row }) => (
                <Input
                    type="text"
                    value={row.original.Value}
                    onChange={(event) => handleInputChange(row.original.TagName, 'Value', event)}
                    className="form-control"
                />
            )
        },
        {
            id: 'delete',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='w-full flex justify-center'>
                    <DeleteButton
                        onClick={() => onDeleteTag(row.original.TagName)}
                    />
                </div>

            )
        }
    ];

    return (
        <div className="w-full mt-4">
            <Table
                headerColor={Colors.warning}
                columns={columns}
                data={data}
                className="bg-gray-100"
                enableSorting
            />
        </div>
    );
};

export default TagTable;
