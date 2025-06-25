import React from 'react';
import { Table } from '../../../ui';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../../utils';
import { Tag } from './DicomTagType';

type ImmutableTagTableProps = {
    data: Tag[];
};

const ImmutableTagTable: React.FC<ImmutableTagTableProps> = ({ data }) => {

    const columns: ColumnDef<Tag>[] = [
        {
            accessorKey: 'name',
            header: 'Tag Name',
        },
        {
            accessorKey: 'value',
            header: 'Value',
        }
    ];

    return (
        <div className="w-full mt-4">
            <Table
                headerColor={Colors.warning}
                footerColor={Colors.warning}
                columns={columns}
                data={data}
                className="bg-gray-100"
                enableSorting
            />
        </div>
    );
};

export default ImmutableTagTable;
