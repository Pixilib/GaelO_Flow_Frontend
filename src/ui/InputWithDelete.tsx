// EditableField.tsx
import React, { ChangeEvent } from 'react';
import { Input, Label } from '../ui';
import { Trash } from '../icons';

type InputWithDeleteProps = {
    label: string;
    value: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: (field: string, checked: boolean) => void;
    fieldName: string;
    fieldsToRemove: string[];
    [key: string]: any
}

const InputWithDelete: React.FC<InputWithDeleteProps> = ({
    label,
    value,
    onChange,
    onRemove,
    fieldName,
    fieldsToRemove,
    readOnly = false,
    required = false,
    placeholder = ""
}) => {
    const isMarkedForRemoval = fieldsToRemove.includes(fieldName);

    return (
        <fieldset className={`flex flex-col ${isMarkedForRemoval ? 'opacity-50' : ''}`}>
            <Label
                value={label}
                className={`text-sm font-medium ${isMarkedForRemoval ? 'line-through' : ''}`}
            />
            <div className="flex items-center gap-3 w-full">
                <Input
                    value={value || ""}
                    onChange={onChange}
                    readOnly={readOnly || isMarkedForRemoval}
                    required={required}
                    placeholder={placeholder}
                    disabled={isMarkedForRemoval}
                    className={`
                        w-full 
                        ${isMarkedForRemoval ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
                    `}
                />
                <Trash size={"1.3rem"} className="fill-danger cursor-pointer" onClick={() => onRemove(fieldName, !isMarkedForRemoval)} />
            </div>
        </fieldset>
    );
};

export default InputWithDelete;