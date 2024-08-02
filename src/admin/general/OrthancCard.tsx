import { useState } from 'react';
import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

import { Table, Button, ToggleEye, Input, Modal, CardFooter, SelectInput } from '../../ui/';
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

    const [showModal, setShowModal] = useState(false);

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
            cell: (row: any) => {
                const [show, setShow] = useState(false);
                return (
                    <div className="flex items-center">
                        <Input disabled
                            className="text-center"
                            type={show ? "text" : "password"}
                            value={row.getValue()} />
                        <ToggleEye onToggle={(visible) => setShow(visible)} />
                    </div>
                );
            },
            header: 'Password'
        },
    ];

    const handleSelectChange = (selectedOption: any) => {
        mutateVerbosity({ level: selectedOption.value })
    };

    const orthancInfoHandler = () => {
        refetchOrthancSystem();
        setShowModal(true);
    }

    const selectOptions = [
        { value: 'trace', label: 'Trace' },
        { value: 'default', label: 'Default' },
        { value: 'verbose', label: 'Verbose' },
    ];

    return (
        <>
            <Table
                columns={columns}
                data={[orthancData]}
                className="bg-gray-100"
                headerTextSize='xs'
                headerColor={Colors.white}
            />
            <CardFooter
                className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light gap-3">
                <Button
                    color={Colors.warning}
                    onClick={reset}>
                    <RestartIcon
                        size="20px"
                        title="Restart" />
                </Button>
                <Button
                    color={Colors.danger}>
                    <IoClose
                        size="20px"
                        title="Shutdown" />
                </Button>
                <Button color={Colors.primary} onClick={orthancInfoHandler}>
                    <BsQuestionLg size="20px" title="Info" />
                </Button>
                <div className="w-1/4">
                    <SelectInput
                        value={selectOptions.find(option => option.value === orthancVerbosity)?.value ?? null}
                        onChange={handleSelectChange}
                        placeholder="Select option"
                        options={selectOptions}
                    />
                </div>
            </CardFooter>
            {showModal && (
                <Modal
                    show={showModal}
                    size="lg"
                    onClose={() => setShowModal(false)}>
                    <Modal.Header onClose={() => setShowModal(false)}>
                        <Modal.Title>Orthanc System Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {orthancSystem ? (
                            <div className='p-4 bg-gray-200 rounded-lg'>
                                <pre className='text-sm break-all whitespace-pre-wrap'>
                                    {JSON.stringify(orthancSystem, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color={Colors.primary} onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default OrthancSettingsCard;
