import React from 'react';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Input from '../../ui/Input';
import { Colors } from '../../utils/enums';
import { ColumnDef } from '@tanstack/react-table';
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
