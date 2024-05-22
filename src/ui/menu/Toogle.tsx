import { useState } from 'react';
import Label from '../Label';

type ToggleProps = {
    onChange: () => void;
    label?: string | React.ReactElement<typeof Label>;
    labelPosition?: 'left' | 'top';
};

const Toggle = ({ onChange, label, labelPosition = 'left' }: ToggleProps) => {
    const [checked, setChecked] = useState(false);

    // Gestionnaire de changement de l'état
    const handleChange = () => {
        setChecked(!checked);
        onChange();
    };

    // Rendu du Label
    const renderLabel = () => {
        if (!label) return null;
        if (typeof label === 'string') {
            return <span className="text-sm italic font-medium ">{label}</span>;
        } else {
            return label;
        }
    };

    return (
        <label className={`flex ${labelPosition === 'top' ? 'flex-col' : 'flex-row items-center'} gap-2`}>
            {/* Label à gauche ou en haut */}
            {renderLabel()}

            {/* Input checkbox avec Switch */}
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={handleChange}
                />
                <div
                    className={`peer ring-0 transition-colors duration-300 rounded-full w-16 h-7 shadow-md 
                    ${checked ? 'bg-emerald-500' : 'bg-rose-500'} 
                    relative after:content-['✖️'] after:bg-gray-50 after:absolute after:rounded-full after:h-6 after:w-6 after:top-0.5 after:left-0.5 after:flex after:items-center after:justify-center text-xs
                    peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0`}
                ></div>
            </div>
        </label>
    );
};

export default Toggle;
