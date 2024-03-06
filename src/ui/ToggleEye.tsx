import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Colors } from '../utils/enums';

const ToggleEye = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const iconStyle = { color: Colors.gray };

    return (
        <div className="flex items-center">
            <button onClick={toggleVisibility} className="text-xl">
                {isVisible ? <FaEye style={iconStyle} /> : <FaEyeSlash style={iconStyle} />}
            </button>
        </div>
    );
};

export default ToggleEye;
