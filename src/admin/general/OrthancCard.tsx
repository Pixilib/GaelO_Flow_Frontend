import React, { useState, useEffect } from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';
import Button from '../../RenderComponents/Button';
import { Colors } from '../../utils/enums';

import Restart from '../../assets/restart.svg?react';
import Shutdown from '../../assets/shutdown.svg?react';
import Info from '../../assets/info.svg?react';

interface OrthancData {
    address: string;
    port: number;
    password: string;
    username: string; 
}

const OrthancSettingsCard: React.FC = () => {
    const columnHelper = createColumnHelper<OrthancData>();
    const [data, setData] = useState<OrthancData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const loadedData = [
                {
                    address: 'https://orthanc',
                    port: 1234,
                    password: 'password',
                    username: 'admin',
                },
            ];
            setData(loadedData);
        };

        fetchData();
    }, []);

    const columns: ColumnDef<OrthancData>[] = [
        columnHelper.accessor('username', {
            header: () => 'Username',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('address', {
            header: () => 'Address',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('port', {
            header: () => 'Port',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('password', {
            header: () => 'Password',
            cell: () => '••••••',
        }),
    ];
    return (
        <div className='mt-4'>
            <Card>
                <CardHeader title="Orthanc Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="w-full mb-4">
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center space-x-4">
                    <Button color={Colors.secondary} onClick={() => console.log('Restart action')}>
                        <Restart />
                    </Button>
                    <Button color={Colors.danger} onClick={() => console.log('Shutdown action')}>
                        <Shutdown />
                    </Button>
                    <Button color={Colors.primary} onClick={() => console.log('Info action')}>
                        <Info />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrthancSettingsCard;
