import React, { useState, ChangeEvent } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";

interface NewAetCardProps {
    onClose: () => void;
}

const NewAetCard: React.FC<NewAetCardProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [aet, setAet] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [port, setPort] = useState('');

    const options = [
        { value: 'Generic', label: 'Generic' },
        { value: 'GenericNoWildcardInDates', label: 'GenericNoWildcardInDates' },
        { value: 'GenericNoUniversalWildcard', label: 'GenericNoUniversalWildcard' },
        { value: 'Vitrea', label: 'Vitrea' },
        { value: 'GE', label: 'GE' },
    ];

    const handleSelectChange = (selectedOption: any) => {
        console.log(selectedOption);
    };

    return (
        <div className="flex flex-col h-full">
            <Card className="flex flex-col h-full">
                <CardHeader title="New Aet" color={Colors.success}>
                    <div className="flex items-center justify-between">
                        <CgClose size="24px" title="Close" onClick={onClose} className="mr-2 cursor-pointer" />
                    </div>
                </CardHeader>
                <CardBody className="bg-stone-400">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Name"
                            className="w-full"
                            bordered
                            placeholder="Enter your name"
                            value={name}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                        />
                        <Input
                            label="Aet"
                            className="w-full"
                            bordered
                            placeholder="Enter Aet"
                            value={aet}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setAet(event.target.value)}
                        />
                        <Input
                            label="IP Address"
                            className="w-full"
                            bordered
                            placeholder="Enter your IP address"
                            value={ipAddress}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setIpAddress(event.target.value)}
                        />
                        <Input
                            label="Port"
                            className="w-full"
                            bordered
                            placeholder="Enter your port"
                            value={port}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPort(event.target.value)}
                        />
                    </div>
                    <SelectInput
                        onChange={handleSelectChange}
                        placeholder="Select option"
                        options={options}
                    />
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button color="success">
                        <AiOutlineCheck size="20px" title="Check" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NewAetCard;
