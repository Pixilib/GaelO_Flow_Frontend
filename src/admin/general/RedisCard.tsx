import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../ui/';
import { Colors } from '../../utils/enums';
import { Badge } from '../../ui';

interface RedisData {
    address: string;
    port: number;
    password?: string;
}

interface RedisCardProps {
    redisData: RedisData;
}

const RedisCard: React.FC<RedisCardProps> = ({ redisData }) => {

    const columns: ColumnDef<RedisData>[] = [
        {
            accessorKey: 'address',
            header: () => 'Address',
        },
        {
            accessorKey: 'port',
            header: () => 'Port',
            cell: ({ getValue }) => <Badge value={getValue() as number} />,
        }
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
