import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table, Card, CardBody, CardFooter } from '../../ui/';
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
            <CardBody color={Colors.light} roundedTopLeft roundedTopRight>
                <h2 className="mt-4 mb-5 text-2xl font-bold text-primary">Redis</h2>
                <Table columns={columns} data={[redisData]} headerColor={Colors.almond} />
            </CardBody>
            <CardFooter color={Colors.light}>
                <div className="w-full h-16"></div>
            </CardFooter>
        </Card>
    );
};

export default RedisCard;
