import React from 'react';
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
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleSelectChange = (selectedOption: any) => {
        console.log(selectedOption);
    };

    return (
        <div className="flex flex-col h-full">
            <Card className="flex flex-col h-full">
                <CardHeader title="New Aet" color={Colors.success}>
                    <div className="flex items-center justify-between">
                        <CgClose size="24px" title="Close" onClick={onClose} className="cursor-pointer" />
                    </div>
                </CardHeader>
                <CardBody color={Colors.grayCustom}>
                    <div className="flex flex-col space-y-4">
                        <Input placeholder="Input 1" />
                        <Input placeholder="Input 2" />
                        <Input placeholder="Input 3" />
                        <Input placeholder="Input 4" />
                        <SelectInput
                            onChange={handleSelectChange}
                            placeholder="Select option"
                            options={options}
                        />
                    </div>
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
