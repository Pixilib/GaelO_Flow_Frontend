import React, { useId } from 'react';

type CheckBoxProps = {
    label?: string | React.ReactNode;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    bordered?: boolean;
    [key: string]: any;
};

const CheckBox: React.FC<CheckBoxProps> = ({
    label,
    checked,
    onChange,
    bordered = false,
    ...props
}) => {
    const id = useId();

    const inputClassNames= `w-4
        h-4
        border-gray-300
        rounded-xs
        text-secondary
        focus:ring-secondary
        dark:focus:ring-orange-600
        dark:ring-offset-gray-800
        focus:ring-2
        cursor-pointer
        ${checked ? 'bg-secondary' : 'bg-gray-100'}
        dark:${checked ? 'bg-secondary' : 'bg-gray-700'} peer`;

    return (
        <div className={`flex items-center ${bordered ? 'border' : ''} rounded`}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={inputClassNames}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className={`w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default CheckBox;
