import React, { useState, useEffect } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';

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
                setLoading(true);
                const loadedData = [
                    {
                        address: 'https://orthanc',
                        port: 8042,
                        password: 'secret',
                    },
                ];
                setData(loadedData);
                setError(null); 
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
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
            cell: info => info.getValue(),
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
