import React from 'react';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/Table';
import Input from '../../ui/Input';

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

interface RedisData {
    address: string;
    port: number;
}

type redisCardProps = {
    redisData: RedisData
}

const RedisCard = ({ redisData }: redisCardProps) => {

    const columns = [
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'port',
            header: 'Port',
            cell: info => <Badge value={info.getValue() as number} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: row => <Input disabled type='password' value={row.getValue()} />,
        },
    ];

    return (
        <Card>
            <CardHeader title="Redis Settings" />
            <CardBody>
                <Table columns={columns} data={[redisData]} />
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    );
};

export default RedisCard;
