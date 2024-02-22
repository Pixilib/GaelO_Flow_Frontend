import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomQuery } from "../../utils/reactQuery";
import { apiSystem } from '../../services/orthanc';

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

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

const OrthancSettingsCard: React.FC = () => {
    const [data, setData] = useState<OrthancData[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://otjs.ddns.net/api/system', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    
    //             const loadedData = await response.json();
    //             setData(loadedData); 
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         }
    //     };
    
    //     fetchData();
    // }, []);
    
    const getOrthancData = useCustomQuery( ["OrthancData"],
    ()=> apiSystem(),
    {

    }
    )

    const columns: ColumnDef<OrthancData>[] = [
        {
            accessorKey: 'username',
            header: 'Username',
            cell: info => info.getValue(),
        },
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
                <CardHeader title="Orthanc Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="w-full mb-4">
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center space-x-4">
                    <Button color={Colors.orange} onClick={() => console.log('Restart action')}><Restart /></Button>
                    <Button color={Colors.danger} onClick={() => console.log('Shutdown action')}><Shutdown /></Button>
                    <Button color={Colors.primary} onClick={() => console.log('Info action')}><Info /></Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrthancSettingsCard;
