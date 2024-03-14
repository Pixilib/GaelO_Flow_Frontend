import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Button from '../../ui/Button';
import { Colors } from '../../utils/enums';
import Popover from '../../ui/Popover';
import ToggleEye from '../../ui/ToggleEye';
import SelectInput from '../../ui/SelectInput'; 

import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";
import Input from '../../ui/Input';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem, orthancReset } from '../../services/orthanc';

const Badge: React.FC<{ value: number }> = ({ value }) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20`;
    return <span className={badgeClasses}>{value}</span>;
};




type OrthancCardProps = {
    orthancData: OrthancData;
};

const orthancDetails = (
    <div className="p-4">
        <div className="mb-4">
            <h3 className="mb-2 text-lg font-bold">System </h3>
            <p className="mb-1"><span className="font-semibold">0:</span> explorer.js</p>
            <p><span className="font-semibold">1:</span> dicom-web</p>
        </div>
        <div>
            <h3 className="mb-2 text-lg font-bold">Plugins</h3>
            <p className="mb-1"><span>explorer.js</span> </p>
            <p><span>dicom-web</span> </p>
        </div>
    </div>
)

const OrthancSettingsCard = ({ orthancData }: OrthancCardProps) => {
    const { data: orthancSystem } = useCustomQuery(['system'], () => getOrthancSystem(), {
        enabled: false,
    });

    const { mutate: resetOrthanc } = useCustomMutation(
        orthancReset,
        []
    );

    const reset = () => {
        resetOrthanc({});
    };

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
            cell: (row: any) => <Badge value={row.getValue() as number} />,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            cell: (row: any) => {
                const [show, setShow] = useState(false);
                return (
                    <div className="flex items-center">
                        <Input disabled className="text-center" type={show ? "text" : "password"} value={row.getValue()} />
                        <ToggleEye onToggle={(visible) => setShow(visible)} />
                    </div>
                );

            }
        },
    ];

    const handleSelectChange = (selectedOption: any) => {
        console.log("Selected option:", selectedOption);
    };

    return (
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
                <Button color={Colors.orange} onClick={reset}>
                    <RestartIcon size="20px" title="Restart" />
                </Button>
                <Button color={Colors.danger} onClick={() => console.log('Shutdown action')}>
                    <IoClose size="20px" title="Shutdown" />
                </Button>
                <Popover popover={orthancDetails} placement="bottom"  >
                        <Button color={Colors.primary}>
                            <BsQuestionLg size="20px" title="Info" />
                        </Button>
                    </Popover>
                <SelectInput
                    onChange={handleSelectChange}
                    placeholder="Select option" options={[]}                />
            </CardFooter>
        </Card>
    );
};

export default OrthancSettingsCard;
