import React from "react";
import { Colors } from "../utils/enums";

type InputProps = {
  className?: string;
  variant?: Colors.light | Colors.dark;
  type?: string;
  placeholder?: string;
  label?: string;
  svgLeft?: React.ReactNode;
  svgRight?: React.ReactNode;
  bordered?: boolean;
  min?: number;
  max?: number;
  step?: number;
  [key: string]: any;
};

const Input = ({
  className,
  placeholder,
  label,
  type = "text",
  min,
  max,
  step,
  svgLeft = null,
  svgRight = null,
  bordered = false,
  ...props
}: InputProps) => {
  const inputClassName = `w-full bg-gray-50 peer border text-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-opacity-50`;

  return (
    <div className="w-full">
      {label && <label className="mb-2 text-sm font-medium text-dark">{label}</label>}
      <div className="relative">
        {svgLeft && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {svgLeft}
          </div>
        )}
        {svgRight && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            {svgRight}
          </div>
        )}
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`${inputClassName} ${className} ${bordered ? "border-2 border-gray-300" : "border-none"} ${svgLeft ? "pl-11" : ""} ${svgRight ? "pr-11" : ""} py-2 rounded-xl text-sm`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
