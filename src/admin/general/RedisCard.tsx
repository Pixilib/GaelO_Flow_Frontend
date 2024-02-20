import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

interface RedisData {
    address: string;
    port: number;
    password: string;
}

const RedisCard: React.FC = () => {
    const [data, setData] = useState<RedisData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedData = [
                    { address: 'redis', port: 6379, password: 'secret' },
                ];
                setData(loadedData);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns: ColumnDef<RedisData>[] = [
        {
            accessorKey: 'address',
            header: 'Address',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'port',
            header: 'Port',
            cell: info => <Badge value={info.getValue() as number} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: () => '••••••',
        },
    ];

    return (
        <div className='mt-4'>
            <Card>
                <CardHeader title="Redis Settings" />
                <CardBody>
                    {error && <div className="text-red-500">{error}</div>}
                    {loading ? (
                        <div className="flex justify-center">Loading...</div>
                    ) : (
                        <Table columns={columns} data={data} />
                    )}
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RedisCard;
