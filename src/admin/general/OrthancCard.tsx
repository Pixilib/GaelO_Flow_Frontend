import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import { Colors } from '../../utils/enums';
import Popover from '../../ui/menu/Popover';
import ToggleEye from '../../ui/ToggleEye';

import { VscDebugRestart } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";import { BsQuestionLg } from "react-icons/bs";
import Input from '../../ui/Input';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem, orthancReset } from '../../services/orthanc';
interface OrthancData {
    address: string;
    port: number;
    password: string;
    username: string;
}

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};

type OrthancCardProps = {
    orthancData: OrthancData;
};

const OrthancSettingsCard = ({ orthancData }: OrthancCardProps) => {
    const { data: orthancSystem, refetch } = useCustomQuery(['system'], () => getOrthancSystem(), {
        enabled: false,
    });

    const { mutate: resetOrthanc } = useCustomMutation(() => orthancReset(), []);

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
            cell: row => {
                const [show, setShow] = useState(false)
                return (
                    <div className="flex items-center">
                        <Input disabled className="text-center" type={show ? "text" : "password"} value={row.getValue()} />
                        <ToggleEye onToggle={(visible) => setShow(visible)} />
                    </div>)

            }
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
                        <VscDebugRestart size="20px" title="Restart" />
                    </Button>
                    <Button color={Colors.danger} onClick={() => console.log('Shutdown action')}>
                    <IoClose size="20px" title="Shutdown" />
                    </Button>
                    {/* Le Popover est utilisé ici comme un wrapper autour du bouton qui déclenche le Popover */}
                    <Popover
                        trigger={
                            <Button color={Colors.primary}>
                                <BsQuestionLg size="20px" title="Info" />
                            </Button>
                        }
                        content={
                            orthancSystem ? (
                                <div>Version: {orthancSystem.Version}</div>
                            ) : (
                                <div>Loading information...</div>
                            )
                        }
                        placement="bottom"
                    />
                </CardFooter>
            </Card>
        </div>
    );
};


export default OrthancSettingsCard;