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
import { getOrthancSystem, getVerbosity, orthancReset, updateVerbosity } from '../../services/orthanc';
import { Badge } from '../../ui';

type OrthancData = {
    username: string;
    address: string;
    port: number;
    password: string;
};

type OrthancCardProps = {
    orthancData: OrthancData;
};

const OrthancSettingsCard = ({ orthancData }: OrthancCardProps) => {

    const { data: orthancSystem, refetch: refetchOrthancSystem } = useCustomQuery(
        ['system'],
        () => getOrthancSystem(),
        {
            enabled: false,
        }
    );

    const { data: orthancVerbosity} = useCustomQuery(
        ['log-level'],
        () => getVerbosity()
    );

    const { mutate: resetOrthanc } = useCustomMutation(
        () => orthancReset(),
        []
    );

    const { mutate: mutateVerbosity } = useCustomMutation(
        ({ level }) => updateVerbosity(level),
        [['log-level']],
    );

    const reset = () => {
        resetOrthanc(undefined);
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
        mutateVerbosity({ level: selectedOption.value })
    };

    const orthancInfoHandler = () => {
        refetchOrthancSystem();
    }

    const selectOptions = [
        { value: 'trace', label: 'Trace' },
        { value: 'default', label: 'Default' },
        { value: 'verbose', label: 'Verbose' },
    ];

    return (
        <Card>
            <CardHeader title="Orthanc Settings" color={Colors.primary} />
            <CardBody color={Colors.light} className="pb-0 mb-0">
                <Table columns={columns} data={[orthancData]} headerColor={Colors.almond} />
            </CardBody>
            <CardFooter className="flex justify-center space-x-4" color={Colors.light}>
                <Button color={Colors.orange} onClick={reset}>
                    <RestartIcon size="20px" title="Restart" />
                </Button>
                <Button color={Colors.danger} >
                    <IoClose size="20px" title="Shutdown" />
                </Button>
                <Popover popover={orthancSystem ? <>{JSON.stringify(orthancSystem, null, 2)}</> : <></>} placement="bottom" >
                    <Button color={Colors.primary} onClick={orthancInfoHandler}>
                        <BsQuestionLg size="20px" title="Info" />
                    </Button>
                </Popover>
                <SelectInput
                    value = {selectOptions.find(option => option.value === orthancVerbosity)}
                    onChange={handleSelectChange}
                    placeholder="Select option"
                    options={selectOptions}
                />
            </CardFooter>
        </Card>
    );
};

export default OrthancSettingsCard;
