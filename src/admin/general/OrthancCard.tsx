import { useState } from 'react';
import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

import { Table, Button, ToggleEye, Input, Modal, Card, CardBody, CardFooter, SelectInput } from '../../ui/';
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
                        <Input disabled className="text-center" type={show ? "text" : "password"} value={row.getValue()} />
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
        <Card>
            <CardBody color={Colors.light} roundedTopLeft roundedTopRight>
                <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Orthanc</h2>
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
                <Button color={Colors.primary} onClick={orthancInfoHandler}>
                    <BsQuestionLg size="20px" title="Info" />
                </Button>
                <SelectInput
                    value={selectOptions.find(option => option.value === orthancVerbosity)}
                    onChange={handleSelectChange}
                    placeholder="Select option"
                    options={selectOptions}
                />
            </CardFooter>
            {showModal && (
                <Modal show={showModal} size="lg" onClose={() => setShowModal(false)}>
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
        </Card>
    );
};

export default OrthancSettingsCard;
