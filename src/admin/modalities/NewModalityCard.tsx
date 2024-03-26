import React, { useState, ChangeEvent } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";
import { Option } from "../../utils/types";
import { useCustomToast } from "../../utils/toastify";

interface NewAetCardProps {
    onClose: () => void;
    onCreateAet: (aet: { name: string, aet: string, host: string, port: number, manufacturer: string }) => void,
}

const NewModalityCard: React.FC<NewAetCardProps> = ({ onClose, onCreateAet }) => {

    const { toastWarning } = useCustomToast();
    const [name, setName] = useState('');
    const [aet, setAet] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [manufacturer, setManufacturer] = useState<Option | null>(null);

    const options = [
        { value: 'Generic', label: 'Generic' },
        { value: 'GenericNoWildcardInDates', label: 'GenericNoWildcardInDates' },
        { value: 'GenericNoUniversalWildcard', label: 'GenericNoUniversalWildcard' },
        { value: 'Vitrea', label: 'Vitrea' },
        { value: 'GE', label: 'GE' },
    ];

    const handleSelectChange = (option: any) => {
        setManufacturer(option)
    };

    const onSubmitAet = () => {
        //TODO verifier name, AET, host et port sont définis
        if (name.length === 0) {

            //Afficher un toast pour dire qu'il manque le name
            toastWarning("Missing name")
            return;
        }

        onCreateAet({
            name,
            aet,
            host,
            port: Number(port),
            manufacturer: manufacturer?.value ?? 'Generic'
        })
    }

    return (
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
                        value={host}
                        required
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setHost(event.target.value)}
                    />
                    <Input
                        label="Port"
                        type="number"
                        className="w-full"
                        bordered
                        placeholder="Enter your port"
                        value={port}
                        min={0}
                        step={1}
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
                <Button color={Colors.success} onClick={() => onSubmitAet()}>
                    <AiOutlineCheck size="20px" title="Check" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NewModalityCard;
