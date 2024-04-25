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
  children,
  min = undefined,
  max = undefined,
  step = undefined,
  svgLeft = null,
  svgRight = null,
  bordered = false,
  ...props
}: InputProps) => {
 
  const InputClassName = `
  w-full 
  bg-gray-50 
  peer 
  border 
  border-gray
  text-gray-500 
  focus:outline
  focus:shadow-outline
  focus:primary focus:ring-primary focus:ring-2
  p-2.5 
  pl-10 
  block 
  dark:bg-gray-700 
  dark:border-gray-600 
  dark:placeholder-gray-400 
  dark:text-white 
  dark:focus:ring-blue-500 
  dark:focus:border-blue-500 
  disabled:cursor-not-allowed 
  disabled:bg-gray-100 
  disabled:dark:bg-opacity-50
`;
//`bg-gray-50 peer text-dark focus:primary focus:ring-primary focus:ring-2 focus:shadow-outline`
  
  return (
    <div className="w-full">
      {label && 
      typeof label === "string" ?  (
        <label 
        className="mb-2 text-sm font-medium text-dark">{label}</label>
      ) : label}
      
      <div className="relative">
        {svgLeft && (
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {svgLeft}
          </div>
        )}
        {svgRight && (
          <div className="absolute inset-y-0 flex items-center end-0 pe-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {svgRight}
          </div>
        )}
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`
          peer block py-3 ${svgLeft ? "ps-11" : ""} ${svgRight ? "pe-11" : ""}
           ${bordered ? " border-2 border-gray " : "border-none"}
           text-gray-600 w-full rounded-xl text-sm disabled:pointer-events-none 
           disabled:opacity-50 ${InputClassName}${className}
           `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
