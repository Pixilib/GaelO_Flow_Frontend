import React from "react";
import { Colors } from "../utils/enums";


//!WIP This is new version of Input component more flexible and customizable
type spaceYtype = 1 | 2 | 3 | 4 | 5 | 6;
type InputProps = {
    className?: string;
    label?: {
        value: string;
        spaceY?: spaceYtype;
        className?: string;
        align?: 'left' | 'center' | 'right';
    };
    variant?: keyof typeof variantStyles;
    // size?: sizeInput;
    svgLeft?: React.ReactNode;
    svgRight?: React.ReactNode;
    bordered?: boolean;
    [key: string]: any;
};

// type sizeInput = "sm" | "md" | "lg" | "xl" | "xxl" | "auto";
// type SizeClasses = {
//     [K in sizeInput]: string;
// };
// const defaultSizeClasses:SizeClasses = {
//     sm: "w-32 text-sm h-8",
//     md: "w-48 text-md h-9",
//     lg: "w-52 text-md h-10",
//     xl: "w-72 text-md h-10",
//     xxl: "w-96 text-md h-10",
//     auto: "w-full text-md h-10",
// };

const variantStyles = {
    [Colors.light]: "bg-gray-50 peer border border-gray-300 text-gray-500 focus:ring-gray-500 focus:ring-2 focus:shadow-outline",
    [Colors.primary]: "bg-gray-50 peer text-dark focus:primary focus:ring-primary focus:ring-2 focus:shadow-outline",
    [Colors.success]: "bg-gray text-dark peer focus:ring-success focus:ring-2 focus:shadow focus:ring-opacity-50",
    // Add more variant styles here
    // [Colors.yyyy]: "border-xxx bg-xxx text-xxx focus:ring-xxx",
} as const;
const defaultVariant = "border-gray-200 bg-white text-gray-700 focus:ring-gray-200";



const Input2 = ({
    className,
    label = { value: '', className: 'font-medium text-dark', align: 'left' },
    size,
    svgLeft = null,
    svgRight = null,
    bordered = true,
    variant,
    ...props
}: InputProps) => {
    const variantClass = variant ? variantStyles[variant] : defaultVariant;
    const borderClass = bordered ? "border-2" : "border-none";

    const inputClasses = 
       `${svgLeft ? "pl-11" : ""} ${svgRight ? "pr-11" : ""} 
        py-2 px-3 rounded-md block py-2 focus:outline-none 
        disabled:cursor-not-allowed rounded-xl
        ${variantClass} ${borderClass} ${className}`;
    const { spaceY = 2 } = label;

    return (
        <div className={`text-${label.align || 'left'}`}>
            {label && <label className={`${label.className}`}>{label.value}</label>}
            <div className={`relative mt-${spaceY?.toString()}`}>
                {svgLeft && 
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {svgLeft}
                </div>}
                {svgRight && 
                <div className="absolute inset-y-0 flex items-center cursor-pointer end-0 pe-4">
                    {svgRight}
                </div>}
                <input {...props} className={inputClasses} />
            </div>
        </div>
    );
};

export default Input2;
