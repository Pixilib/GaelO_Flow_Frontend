import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table, Badge } from '../../ui';
import { Colors } from '../../utils/enums';

type RedisData = {
    address: string;
    port: number;
    password?: string;
}

type RedisCardProps = {
    redisData: RedisData;
}

const RedisCard: React.FC<RedisCardProps> = ({ redisData }) => {
    const columns: ColumnDef<RedisData>[] = [
        {
            accessorKey: 'address',
            header: () => <div>Address</div>,
            cell: ({ getValue }) => (
                <div>{getValue() as string}</div>
            ),
        },
        {
            accessorKey: 'port',
            header: () => <div>Port</div>,
            cell: ({ getValue }) => <Badge value={getValue() as number} />,
        },
    ];

    return (
        <div className="mx-6 mt-6">
            <Table
                columns={columns}
                data={[redisData]}
                className="bg-gray-100"
                headerTextSize='xs'
                headerColor={Colors.white}
            />
            <div className="h-16"></div>
        </div>
    );
};

export default RedisCard;
