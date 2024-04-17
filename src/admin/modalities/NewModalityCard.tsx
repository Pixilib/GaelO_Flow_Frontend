import { ChangeEvent, useState } from 'react';
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { CgClose as CloseIcon } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";
import { useCustomToast } from "../../utils/toastify";

interface AetData {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

interface Option {
    value: string;
    label: string;
}

interface NewModalityCardProps {
    onClose: () => void;
    onCreateAet: (aet: AetData) => void;
}

const NewModalityCard: React.FC<NewModalityCardProps> = ({ onClose, onCreateAet }) => {
    const { toastWarning } = useCustomToast();
    const [name, setName] = useState('');
    const [aet, setAet] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState<number | ''>('');
    const [manufacturer, setManufacturer] = useState<Option | null>(null);

    const options = [
        { value: 'Generic', label: 'Generic' },
        { value: 'GenericNoWildcardInDates', label: 'GenericNoWildcardInDates' },
    ];

    const handleSelectChange = (option: Option) => {
        setManufacturer(option);
    };

    const isValidPort = (port: number) => port > 0 && port <= 65535;

    const onSubmitAet = () => {
        if (!name.trim() || !aet.trim() || !host.trim() || port === '' || isNaN(Number(port)) || !isValidPort(Number(port)) || !manufacturer) {
            toastWarning("Please fill in all fields correctly with a valid port number (1-65535).");
            return;
        }

        const newAetData: AetData = {
            name,
            aet,
            host,
            port: Number(port),
            manufacturer: manufacturer.value,
        };

        onCreateAet(newAetData);
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader title="Create New Modality" color={Colors.success}>
                <CloseIcon size="24px" title="Close" onClick={onClose} className="cursor-pointer" />
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Name" bordered value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} aria-label="Modality Name" />
                    <Input label="AET" bordered value={aet} onChange={(e: ChangeEvent<HTMLInputElement>) => setAet(e.target.value)} aria-label="AET" />
                    <Input label="Host" bordered value={host} onChange={(e: ChangeEvent<HTMLInputElement>) => setHost(e.target.value)} aria-label="Host" />
                    <Input label="Port" bordered type="number" value={port.toString()} onChange={(e: ChangeEvent<HTMLInputElement>) => setPort(e.target.value === '' ? '' : Number(e.target.value))} aria-label="Port" />
                    <div className="col-span-2">
                        <SelectInput options={options} value={manufacturer} onChange={handleSelectChange} placeholder="Select Manufacturer" aria-label="Manufacturer" />
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitAet} aria-label="Submit New Modality"><CheckIcon size="20px" /></Button>
            </CardFooter>
        </Card>
    );
}

export default NewModalityCard;
