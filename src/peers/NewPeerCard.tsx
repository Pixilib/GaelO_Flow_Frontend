import { ChangeEvent, useState } from 'react';
import { AiOutlineCheck as ChecIcon} from "react-icons/ai";
import { CgClose as CloseIcon} from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";
import { Option } from "../../utils/types";
import { useCustomToast } from "../../utils/toastify";

interface NewModalityCardProps {
    onClose: () => void;
    onCreateAet: () => void;
}

function NewModalityCard({ onClose, onCreateAet }: NewModalityCardProps) {

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

    const handleSelectChange = (option: Option) => {
        setManufacturer(option);
    };

    const onSubmitAet = () => {
        if (!name.trim()) {
            toastWarning("Missing name");
            return;
        }
        if (!host.trim()) {
            toastWarning("Missing host");
            return;
        }
        if (isNaN(Number(port)) || Number(port) <= 0) {
            toastWarning("Invalid port");
            return;
        }

        onCreateAet()
    };

    return (
        <Card className="flex flex-col h-full ">
            <CardHeader title="New Aet" color={Colors.success}>
                <div className="flex items-center justify-between mr-2 ">
                    <CloseIcon size="24px" title="Close" onClick={onClose} className="cursor-pointer " />
                </div>
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        label="Name"
                        bordered
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <Input
                        label="Host"
                        bordered
                        value={host}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setHost(event.target.value);
                        }}
                    />
                    <Input
                        label="Port"
                        bordered
                        value={port}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPort(event.target.value)}
                        type="number"
                    />
                    <SelectInput
                        onChange={handleSelectChange}
                        placeholder="Select Manufacturer"
                        options={options}
                        value={manufacturer}
                        className="mt-7"
                    />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitAet}>
                    <ChecIcon size="20px" title="Check" />
                </Button>
            </CardFooter>
        </Card>
    );
}

export default NewModalityCard;
