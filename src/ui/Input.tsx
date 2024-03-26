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
  bordered? :boolean;
  [key: string]: any;
};

const Input = ({
  className,
  placeholder,
  label,
  type = "text",
  svgLeft = null,
  svgRight = null,
  bordered = false,
  
  ...props
}: InputProps) => {

  return (
    <div className="w-full ">
      {label && <label className="mb-2 text-sm font-medium text-dark">{label}</label>}
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
          placeholder={placeholder}
          className={`peer block py-3 ${svgLeft ? "ps-11" : ""} ${svgRight ? "pe-11" : ""} ${bordered ? "border border-gray focus:border-primary" : "border-none"} text-gray-600 w-full rounded-xl text-sm focus:shadow-lg disabled:pointer-events-none disabled:opacity-50 ${className}`}
          
          {...props}
          
        />

      </div>
    </div>
  );
};

export default Input;
