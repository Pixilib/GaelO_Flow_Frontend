import React from 'react';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Input from '../../ui/Input';
import { Colors } from '../../utils/enums';
import { ColumnDef } from '@tanstack/react-table';

interface BadgeProps {
    value: number;
}

const Badge: React.FC<BadgeProps> = ({ value }) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

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
        },
        {
            accessorKey: 'password',
            header: () => 'Password',
            cell: ({ getValue }) => <Input disabled type='password' value={getValue() as string} />,
        },
    ];

    return (
        <Card>
            <CardHeader title="Redis Settings" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="mt-5"></div>
                <Table columns={columns} data={[redisData]} headerColor={Colors.almond} />
            </CardBody>
            <CardFooter color={Colors.light}>
            </CardFooter>
        </Card>
    );
};

export default RedisCard;
