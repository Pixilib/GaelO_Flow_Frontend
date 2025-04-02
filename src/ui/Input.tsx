import React from "react";
import { Colors } from "../utils/enums";
import Label from "./Label";

type InputProps = {
  className?: string;
  variant?: Colors.light | Colors.dark;
  type?: string;
  placeholder?: string;
  label?: string | React.ReactElement<typeof Label>;
  svgLeft?: React.ReactNode;
  svgRight?: React.ReactNode;
  bordered?: boolean;
  roundedRight?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  [key: string]: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  className,
  placeholder,
  label,
  type = "text",
  autoComplete,
  min = undefined,
  max = undefined,
  step = undefined,
  svgLeft = null,
  svgRight = null,
  bordered = true,
  roundedLeft = true,
  roundedRight = true,

  ...props
}: InputProps) => {
  const InputClassName =
    `w-full 
    bg-gray-50 
    peer 
    border 
    border-gray
    text-gray-500 
    focus:outline
    focus:shadow-outline
    focus:primary focus:ring-primary focus:ring-1
    mr-3
    block 
    dark:bg-stone-800 
    dark:border-white
    dark:placeholder-gray-200 
    dark:text-gray-200 
    dark:focus:ring-indogp-300 
    dark:focus:border-blue-500
    hover:disabled:cursor-not-allowed
    disabled:bg-gray-200 
    disabled:text-gray-400 
    disabled:border-gray-300
    disabled:opacity-60`;

  // Génération de la classe CSS pour contrôler les arrondis
  const borderClasses = bordered ? " border-1 border-gray-custom " : "border-none";
  const roundedRightClass = roundedRight ? "rounded-xl" : "rounded-none";

  return (
    <div className="w-full">
      {label &&
        typeof label === "string" ? (
        <Label value={label} />
      ) : label}

      <div
        className={
          `flex items-center peer ${borderClasses} text-gray-600 dark:text-white w-full ${roundedRightClass} text-sm ${InputClassName} ${className}`
        }>
        {svgLeft && (
          <div className="p-3 pointer-events-none peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {svgLeft}
          </div>
        )}
        <input
          className="w-full bg-transparent border-none min-h-10"
          type={type}
          min={min}
          max={max}
          step={step}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...props}
        />
        {svgRight && (
          <div className="flex justify-end p-3 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {svgRight}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
