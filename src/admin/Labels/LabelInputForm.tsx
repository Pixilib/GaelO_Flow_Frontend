import React, { useState } from 'react';
import { MdOutlineNewLabel } from 'react-icons/md';
import { Button, Input } from '../../ui';
import { Colors } from '../../utils/enums';

interface LabelInputFormProps {
    onCreate: (label: string) => void;
}

const LabelInputForm: React.FC<LabelInputFormProps> = ({ onCreate }) => {
    const [label, setLabel] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
    };

    const handleCreateClick = () => {
        if (label.trim()) {
            onCreate(label);
            setLabel(''); 
        }
    };

    return (
        <div className="relative flex items-center">
            <Input
                type="text"
                value={label}
                onChange={handleInputChange}
                placeholder="Add new label"
                className="w-full px-12 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MdOutlineNewLabel className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
            <Button
                type="button"
                color={Colors.success}
                onClick={handleCreateClick}
                className="absolute right-0 p-3 text-white transform -translate-x-full -translate-y-1/2 rounded-l-none top-1/2 rounded-r-md"
            >
                Create
            </Button>
        </div>
    );
};

export default LabelInputForm;
