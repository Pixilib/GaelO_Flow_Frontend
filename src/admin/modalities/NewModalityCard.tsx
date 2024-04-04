import { ChangeEvent, useState } from 'react';
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { CgClose as CloseIcon } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";
import { Option } from "../../utils/types";
import { useCustomToast } from "../../utils/toastify";


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
        { value: 'GenericNoUniversalWildcard', label: 'GenericNoUniversalWildcard' },
        { value: 'Vitrea', label: 'Vitrea' },
        { value: 'GE', label: 'GE' },
    ];

    const handleSelectChange = (option: Option) => {
        setManufacturer(option);
    };

    const onSubmitAet = () => {
        if (!name.trim()) {
            toastWarning("Missing name");
            return;
        }
        if (!aet.trim()) {
            toastWarning("Missing AET");
            return;
        }
        if (!host.trim()) {
            toastWarning("Missing host");
            return;
        }
        if (port === '' || isNaN(Number(port)) || Number(port) <= 0) {
            toastWarning("Invalid port");
            return;
        }
        if (!manufacturer) {
            toastWarning("Manufacturer is required");
            return;
        }

        const newAetData = {
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
            <CardHeader title="New AET" color={Colors.success}>
                <div className="flex items-center justify-between mr-2">
                    <CloseIcon size="24px" title="Close" onClick={onClose} className="cursor-pointer" />
                </div>
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        label="Name"
                        bordered
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                    />
                    <Input
                        label="AET"
                        bordered
                        value={aet}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setAet(event.target.value)}
                    />
                    <Input
                        label="Host"
                        bordered
                        value={host}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setHost(event.target.value)}
                    />
                    <Input
                        label="Port"
                        bordered
                        value={port.toString()}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPort(event.target.value === '' ? '' : Number(event.target.value))}
                        type="number"
                    />
                    <SelectInput
                        onChange={handleSelectChange}
                        placeholder="Select Manufacturer"
                        options={options}
                        value={manufacturer}
                        className="col-span-2"
                    />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitAet}>
                    <CheckIcon size="20px" title="Check" />
                </Button>
            </CardFooter>
        </Card>
    );
}

export default NewModalityCard;
