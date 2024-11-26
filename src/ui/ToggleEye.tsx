import { useState, MouseEvent } from 'react';
import { Eye, EyeSlash } from '../icons';

interface ToggleEyeProps {
    onToggle: (isVisible: boolean) => void;
    className?: string;
}

const ToggleEye = ({ onToggle, className }: ToggleEyeProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisible(!isVisible);
        if (onToggle) onToggle(!isVisible);
    };

    return (
        <button
            onClick={toggleVisibility}
            className={`text-xl ${className} transition-colors duration-200`}
            type="button"
        >
            {isVisible ? (
                <Eye className="text-gray-500 dark:text-white" />
            ) : (
                <EyeSlash className="text-gray-500 dark:text-white" />
            )}
        </button>
    );
};

export default ToggleEye;
