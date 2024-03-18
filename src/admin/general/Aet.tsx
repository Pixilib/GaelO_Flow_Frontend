import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Input from '../../ui/Input';

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

interface AetData {
    address: string;
    port: number;
    password?: string;
}

type AetProps = {
    aetData: AetData;
}

const Aet: React.FC<AetProps> = ({ aetData }) => {
    const columns = [
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'port',
            header: 'Port',
            cell: (info: { getValue: () => number }) => <Badge value={info.getValue()} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: (row: { getValue: () => string }) => <Input disabled type='password' value={row.getValue()} />,
        },
    ];

    return (
        <Card>
            <CardHeader title="AET Settings" />
            
            <CardFooter>
                {/* Texte*/}
            </CardFooter>
        </Card>
    );
};

export default Aet;
