import React from 'react';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Input from '../../ui/Input';
import { Colors } from '../../utils/enums';

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
            cell: (info: { getValue: () => number; }) => <Badge value={info.getValue() as number} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: (row: { getValue: () => any; }) => <Input disabled type='password' value={row.getValue()} />,
        },
    ];

    return (
        <Card>
            <CardHeader title="Redis Settings" color={Colors.primary} />
            <CardBody color={Colors.light}>
            <div className="mt-5"></div> 
                <Table columns={columns} data={[redisData]} color={Colors.almond} />
            </CardBody>
            <CardFooter color={Colors.light}>
            </CardFooter>
        </Card>
    );
};

export default RedisCard;
