import { useState } from 'react';

import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

import { Table, Button, Popover, ToggleEye, Input, Card, CardHeader, CardBody, CardFooter, SelectInput } from '../../ui/';
import { Colors } from '../../utils/enums';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getOrthancSystem, getVerbosity, orthancReset, updateVerbosity } from '../../services/orthanc';

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

    const { data: orthancVerbosity } = useCustomQuery(
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
            <CardBody color={Colors.light} className="pb-0">
                <Table columns={columns} data={[orthancData]} headerColor={Colors.almond} />
                <div className="h-2"></div>
            </CardBody>
            <CardFooter className="flex justify-center mt-0 space-x-4" color={Colors.light}>
                <Button color={Colors.orange} onClick={reset}>
                    <RestartIcon size="20px" title="Restart" />
                </Button>
                <Button color={Colors.danger} >
                    <IoClose size="20px" title="Shutdown" />
                </Button>
                <Popover popover={orthancSystem ?
                    <div className='overflow-x-auto'>
                        <pre className='whitespace-pre-wrap'>{JSON.stringify(orthancSystem, null, 2)}</pre>
                    </div>
                    : <></>
                } placement="bottom" >
                    <Button color={Colors.primary} onClick={orthancInfoHandler}>
                        <BsQuestionLg size="20px" title="Info" />
                    </Button>
                </Popover>
                <SelectInput
                    value={selectOptions.find(option => option.value === orthancVerbosity)}
                    onChange={handleSelectChange}
                    placeholder="Select option"
                    options={selectOptions}
                />
            </CardFooter>
        </Card>
    );
};

export default OrthancSettingsCard;
