// EditableField.tsx
import React, { ChangeEvent } from 'react';
import { Input, Label } from '../ui';
import { BsTrashFill as Delete } from "react-icons/bs";
import CheckBox from './Checkbox';

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
        <fieldset className={`flex items-center gap-3 ${isMarkedForRemoval ? 'opacity-50' : ''}`}>
            <Input
                label={
                    <Label
                        value={label}
                        className={`text-sm font-medium ${isMarkedForRemoval ? 'line-through' : ''}`}
                    />
                }
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
            <Delete size={"1.3rem"} className="fill-danger" onClick={() => onRemove(fieldName, !isMarkedForRemoval)} />
        </fieldset>
    );
};

export default InputWithDelete;