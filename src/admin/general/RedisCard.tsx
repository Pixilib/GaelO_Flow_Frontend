import React, { useState, useEffect } from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';

interface RedisData {
    address: string;
    port: number;
    password: string;
}

const RedisCard: React.FC = () => {
    const columnHelper = createColumnHelper<RedisData>();
    const [data, setData] = useState<RedisData[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const loadedData = [
                {
                    address: 'https://orthanc',
                    port: 1234,
                    password: 'password',
                },
            ];
            setData(loadedData);
        };

        fetchData();
    }, []);
    
    const columns = [
        columnHelper.accessor('address', {
            header: 'Address',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('port', {
            header: 'Port',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('password', {
            header: 'Password',
            cell: () => '••••••',
        }),
    ];

    return (
        <div className='mt-4'>
            <Card>
                <CardHeader title="Redis Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="w-full mb-4">
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center">
                
            </CardFooter>
            </Card>
        </div>
    );
};

export default RedisCard;
