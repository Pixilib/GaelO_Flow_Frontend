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
        <div className="flex items-center">
            <div className="relative flex items-center w-full">
                <MdOutlineNewLabe />
                <Input
                    type="text"
                    value={label}
                    onChange={handleInputChange}
                    placeholder="Add new label"
                    className="w-full px-4 py-4 border border-gray-300 rounded-r-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Button
                type="button"
                color={Colors.success}
                onClick={handleCreateClick}
                className="p-3 text-white rounded-l-none rounded-r-md"
            >
                Create
            </Button>
        </div>
    );
};

export default LabelInputForm;
