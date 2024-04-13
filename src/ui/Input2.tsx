import React from "react";
import { Colors } from "../utils/enums";

/**
 * Input component with customizable props
 * @param className - Additional classes
 * @param {InputProps["label"]} label - Label for the input
 * @param { VariantKeysAuthorized } variant - Color variant
 * @param {InputProps["size"]} size - Size of the input
 * @param { boolean } bordered - Border around the input
 * @param {[key:string]:any]} props - Additional props
 * @returns JSX.Element
 */
const variantStyles = {
    [Colors.light]: "bg-gray-50 peer border border-gray-300 text-gray-500 focus:ring-gray-500 focus:ring-2 focus:shadow-outline",
    [Colors.primary]: "bg-gray-50 peer text-dark focus:primary focus:ring-primary focus:ring-2 focus:shadow-outline",
    [Colors.success]: "bg-gray text-dark peer focus:ring-success focus:ring-2 focus:shadow focus:ring-opacity-50",
    // Add more variant styles here
    // [Colors.yyyy]: "border-xxx bg-xxx text-xxx focus:ring-xxx",
}as const;

type VariantStyleKeys = keyof typeof variantStyles;
type VariantKeysAuthorized = Extract<VariantStyleKeys, keyof typeof Colors>;
type InputProps = {
    className?: string;
    label?:{value: string, className?: string, align?:'left' | 'center' | 'right'};
    variant?: VariantKeysAuthorized;
    size?:"sm" | "md" | "lg" | "xl";
    svgLeft?: React.ReactNode;
    svgRight?: React.ReactNode;
    bordered?: boolean;
    [key: string]: any;
};

const Input2 = ({
    className,
    label={value: '',className: 'mb-2 font-medium text-dark',align:'left'},
    size,
    svgLeft = null,
    svgRight = null,
    bordered = true,
    variant,
    ...props
}: InputProps) => {
    // Default variant if not provided
    const defaultVariant = "border-gray-200 bg-white text-gray-700 focus:ring-gray-200";
    const sizeClass = (size?: string) => {
        switch (size) {
            case "sm":
                return "w-32 text-sm h-8";
            case "md":
                return "w-48 text-md h-9";
            case "lg":
                return "w-52 text-lg h-10";
            case "xl":
                return "w-72 text-xl h-12";
            default:
                return "w-32 text-md h-8";
        }
    }
    const variantClass = variant? variantStyles[variant] : defaultVariant;
    const borderClass = bordered ? "border-2" : "border-none";
    const inputClasses = `${svgLeft ? "ps-11" : ""} ${svgRight ? "pe-11" : ""} ${sizeClass(size)} py-2 px-3 rounded-md block py-3 focus:outline-none disabled:cursor-not-allowed ${variantClass} ${borderClass} ${className}`;
    return (
        <div className={` text-${label.align}`}>
            {label && <label className={` ${label.className}`}>{label.value}</label>}
            <div className="relative">
                {svgLeft && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{svgLeft}</div>}
                {svgRight && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{svgRight}</div>}
                <input
                    {...props}
                    className={inputClasses}
                />
            </div>
        </div>
    );
};

export default Input2;
