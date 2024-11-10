import { useState, MouseEvent } from 'react';
import { Colors } from '../utils/enums';
import { Eye, EyeSlash } from '../icons';

interface ToggleEyeProps {
    onToggle: (isVisible: boolean) => void;
    className?: string;
}

const ToggleEye = ({ onToggle }: ToggleEyeProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisible(!isVisible);
        if (onToggle) onToggle(!isVisible);
    };

    const iconStyle = { color: Colors.gray };

    return (
        <button onClick={toggleVisibility} className="text-xl" type="button">
            {isVisible ? <Eye style={iconStyle} /> : <EyeSlash style={iconStyle} />}
        </button>
    );
};

export default ToggleEye;
