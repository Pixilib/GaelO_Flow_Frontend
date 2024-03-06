import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ToggleEye = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="flex items-center">
            <button onClick={toggleVisibility} className="text-xl">
                {isVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
            <input
                type={isVisible ? "text" : "password"}
                className="p-2 ml-2 border border-gray-300 rounded"
                placeholder="Votre mot de passe"
            />
        </div>
    );
};

export default ToggleEye;
