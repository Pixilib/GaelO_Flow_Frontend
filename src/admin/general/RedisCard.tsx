import React from 'react';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Input from '../../ui/Input';

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`;
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
        <div className='mt-4'>
            <Card>
                <CardHeader title="Redis Settings" />
                <CardBody>
                    <Table columns={columns} data={[redisData]} />
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RedisCard;
