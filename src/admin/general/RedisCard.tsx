import React from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import {Table, Card, CardHeader, CardBody, CardFooter } from '../../ui/';
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
        <Card>
            <CardHeader title="Redis Settings" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <Table columns={columns} data={[redisData]} headerColor={Colors.almond} />
            </CardBody>
            <CardFooter color={Colors.light}>
            </CardFooter>
        </Card>
    );
};

export default RedisCard;
