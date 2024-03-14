import { useState, MouseEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Colors } from '../utils/enums';

interface ToggleEyeProps {
    onToggle: (isVisible: boolean) => void;
}

const ToggleEye = ({ onToggle }: ToggleEyeProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        setIsVisible(!isVisible);
        if(onToggle) onToggle(!isVisible); 
    };

    const iconStyle = { color: Colors.gray };

    return (
        <button onClick={toggleVisibility} className="text-xl" type="button">
            {isVisible ? <FaEye style={iconStyle} /> : <FaEyeSlash style={iconStyle} />}
        </button>
    );
};

export default ToggleEye;
