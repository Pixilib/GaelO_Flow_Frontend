import React, { useState } from 'react';
import { Button } from '../../ui';
import { Colors } from '../../utils';

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
            <input
                type="text"
                value={label}
                onChange={handleInputChange}
                placeholder="Add new label"
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2"
            />
            <Button
                type="button"
                color={Colors.success}
                onClick={handleCreateClick}
                className="p-2 ml-2 text-white rounded-md focus:outline-none focus:ring-2"
            >
                Create
            </Button>
        </div>
    );
};

export default LabelInputForm;
