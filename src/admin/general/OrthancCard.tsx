import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';
import Button from '../../RenderComponents/Button';
import { Colors } from '../../utils/enums';

import Restart from '../../assets/restart.svg?react';
import Shutdown from '../../assets/shutdown.svg?react';
import Info from '../../assets/info.svg?react';
import Input from '../../RenderComponents/Input';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem, orthancReset } from '../../services/orthanc';

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

    console.log(orthancSystem)

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
            cell: row => <Input disabled type='password' value={row.getValue()} />,
        },
    ];



    return (
        <div className='mt-4'>
            <Card>
                <CardHeader title="Orthanc Settings" />
                <CardBody>
                    <div className="flex justify-center">
                        <div className="mb-4 w-full">
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
                    <Button color={Colors.primary} onClick={() => console.log('Info action')}>
                        <Info title="Info" onClick={() => refetch()} />
                        {
                            orthancSystem ? <div>{orthancSystem.Version}</div> : null
                        }
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrthancSettingsCard;
