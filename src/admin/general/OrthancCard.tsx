import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';
import Button from '../../RenderComponents/Button';
import { Colors } from '../../utils/enums';

import Restart from '../../assets/restart.svg?react';
import Shutdown from '../../assets/shutdown.svg?react';
import Info from '../../assets/info.svg?react';
import { useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem } from '../../services/orthanc';

//!Maybe needs to change interface see src/types/Orthanc/OrthancSystemType.ts
//WIP
//You can see an example respons in JSON format, see src/types/Orthanc/exempleApiSystem.json
//TODO: Change interface to match the response of the request
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

    const { isPending, data: orthancData, error } = useCustomQuery(
        ["orthancData"],
        async () => getOrthancSystem(),
        {
            refetchOnMount: true,
            onSuccess: (orthancData: any) => console.log("La requête a réussi !", orthancData),
            onError: (error: any) => console.log("La requête a échoué !", error),
        }
    )
    
    //!It's for exemple, you can change the return of the request
    if (isPending) return <span>Loading ... </span>
    if (error) return <span>Error: {error.message}</span>
    if (!orthancData) return null
    //! Just for visualize example of response
    console.log({ orthancData })

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
            <div>
                <h1>Orthanc Data</h1>
                <pre>{JSON.stringify(orthancData, null, 2)}</pre>
            </div>
            <Card>
                <CardHeader title="Orthanc Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="mb-4 w-full">
                        if (orthancData)
                            <Table columns={columns} data={orthancData} />
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
