import React, { useId } from 'react';

type CheckBoxProps = {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({label, checked, onChange }) => {
    const id = useId()
    return (
        <div className="flex items-center border border-gray-200 rounded ps-4 dark:border-gray-700">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={id} className="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
