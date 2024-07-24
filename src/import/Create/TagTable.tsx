import React from 'react';
import { Button } from '../../ui';
import { Table } from '../../ui';
import { Colors } from "../../utils/enums";

type TagTableProps = {
    data: { TagName: string, Value: string }[];
    onDataUpdate: (tagName: string, columnId: string, value: string) => void;
    onDeleteTag: (tagName: string) => void;
};

const TagTable: React.FC<TagTableProps> = ({ data, onDataUpdate, onDeleteTag }) => {
    const handleInputChange = (tagName: string, columnId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        onDataUpdate(tagName, columnId, event.target.value);
    };

    const columns = [
        {
            id: 'TagName',
            header: 'Tag Name',
            accessor: 'TagName'
        },
        {
            id: 'Value',
            header: 'Value',
            accessor: 'Value',
            Cell: ({ row, column }: { row: any, column: any }) => (
                <input
                    type="text"
                    value={row.values[column.id]}
                    onChange={(event) => handleInputChange(row.original.TagName, column.id, event)}
                    className="form-control"
                />
            )
        },
        {
            id: 'delete',
            header: 'Actions',
            Cell: ({ row }: { row: any }) => (
                <Button
                    onClick={() => onDeleteTag(row.original.TagName)}
                    color={Colors.danger}
                    className="flex items-center space-x-2"
                >
                    Delete
                </Button>
            )
        }
    ];

    return (
        <div className="w-full mt-4">
            <Table
                columns={columns}
                data={data}
                className="w-full border-collapse table-auto"
                headerTextSize='xs'
                headerColor={Colors.white}
                enableColumnFilters
                enableSorting
            />

        </div>
    );
};

export default TagTable;
