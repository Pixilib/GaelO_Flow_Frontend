import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import { Colors } from '../../utils/enums';
import Input from '../../ui/Input';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem, orthancReset } from '../../services/orthanc';

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

type OrthancCardProps = {
    orthancData: OrthancData
}

const OrthancSettingsCard = ({ orthancData }: OrthancCardProps) => {
    const { data: orthancSystem, refetch } = useCustomQuery(['system'], () => getOrthancSystem(), {
        enabled: false
    })

    const { mutate: resetOrthanc } = useCustomMutation(() => orthancReset(), [])

    const columns = [
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'port',
            header: 'Port',
            cell: row => <Badge value={row.getValue() as number} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: row => <Input disabled className="text-center" type='password' value={row.getValue()} />,
        },
    ];

    return (
        <div className='mt-4'>
            <Card>
                <CardHeader title="Orthanc Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="w-full mb-4">
                            <Table columns={columns} data={[orthancData]} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center space-x-4">
                    <Button color={Colors.orange} onClick={() => resetOrthanc({})}>
                        <Restart title="Reset" />
                    </Button>
                    <Button color={Colors.danger} onClick={() => console.log('Shutdown action')}>
                        <Shutdown title="Shutdown" />
                    </Button>
                    <Button color={Colors.primary} onClick={() => refetch()}>
                        <Info title="Info" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrthancSettingsCard;
