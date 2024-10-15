import { useState, useEffect } from "react";
import { Gear } from "../icons";
import { Popover, SelectInput } from "../ui";

type SelectTransferSyntaxProps = {
    value: string;
    onChange: (value: string) => void;
};

const TRANSCODING_OPTIONS = [
    { value: 'None', label: 'None (use Original TS)' },
    { value: '1.2.840.10008.1.2', label: 'Implicit VR Endian' },
    { value: '1.2.840.10008.1.2.1', label: 'Explicit VR Little Endian' },
    { value: '1.2.840.10008.1.2.1.99', label: 'Deflated Explicit VR Little Endian' },
    { value: '1.2.840.10008.1.2.2', label: 'Explicit VR Big Endian' },
    { value: '1.2.840.10008.1.2.4.50', label: 'JPEG 8-bit' },
    { value: '1.2.840.10008.1.2.4.51', label: 'JPEG 12-bit' },
    { value: '1.2.840.10008.1.2.4.57', label: 'JPEG Lossless' },
    { value: '1.2.840.10008.1.2.4.70', label: 'JPEG Lossless' },
    { value: '1.2.840.10008.1.2.4.80', label: 'JPEG-LS Lossless' },
    { value: '1.2.840.10008.1.2.4.81', label: 'JPEG-LS Lossy' },
    { value: '1.2.840.10008.1.2.4.90', label: 'JPEG 2000 (90)' },
    { value: '1.2.840.10008.1.2.4.91', label: 'JPEG 2000 (91)' },
    { value: '1.2.840.10008.1.2.4.92', label: 'JPEG 2000 (92)' },
    { value: '1.2.840.10008.1.2.4.93', label: 'JPEG 2000 (93)' },
];

const SelectTransferSyntax = ({ value, onChange }: SelectTransferSyntaxProps) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        setClicked(prev => !prev);
        setHovered(false);
    };

    const handleMouseEnter = () => {
        if (!clicked) {
            setHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!event.target.closest('.popover-container')) {
                setClicked(false); 
                setHovered(false);
            }
        };

        if (clicked) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [clicked]);

    return (
        <Popover
            withOnClick
            className="w-64"
            placement="bottom-right"
            popover={
                <SelectInput
                    options={TRANSCODING_OPTIONS}
                    value={value}
                    onChange={(option) => {
                        onChange(option?.value);
                        setClicked(false);
                    }}
                />
            }
            backgroundColor="bg-secondary"
        >
            <div
                className="flex items-center justify-center w-5 h-full cursor-pointer"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Gear
                    className={`w-full h-full transition-transform duration-300 ease-in-out transform ${clicked ? "text-secondary" : hovered ? "hover:text-secondary" : ""
                        } hover:rotate-90`}
                />
            </div>
        </Popover>
    );
};

export default SelectTransferSyntax;