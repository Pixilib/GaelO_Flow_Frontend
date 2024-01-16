import React, { useState } from "react";
import { Variant } from "./enum";


type InputProps = {
  className?: string;
  variant?: Variant.Light | Variant.Dark;
  type?: string;
  placeholder?: string;
  label?: string;
  svgLeft?: React.ReactNode;
  svgRight?: React.ReactNode;
  [key: string]: any;
};




const Input = ({
  className = "",
  variant = Variant.Light,
  placeholder = "",
  label = "",
  type = "text",
  svgLeft = null,
  svgRight = null,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const bgColor = variant === Variant.Light ? "bg-white " : "bg-gray-100 ";
  const bgColorFocus = variant === Variant.Light ? "focus:bg-white " : "focus:bg-gray-100 ";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);



  return (
    <div className={`relative flex flex-col ${className}`}>
      {label && (
        <legend
          className={`transition-all duration-100 ease-in-out
                      ${isFocused
              ? `text-xs absolute -top-2 left-5 ${bgColor} px-1 mb-2 text-primary`
              : "text-sm mb-2 absolute -top-7 left-2 text-dark"
            }`}
        >
          {label}
        </legend>
      )}
      <input
        type={type}
        placeholder={isFocused ? "" : placeholder}
        className={
          ` py-3 bg-gray-10 text-gray-600 w-full text-sm border
           border-gray rounded-xl outline-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none
           dark:text-gray-400 dark:focus:ring-gray-600 ${bgColorFocus} ${className} ${isFocused ? "pl-3 pr-0" : "pl-12 pr-12"} `}
           onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {!isFocused && svgLeft && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          {svgLeft}
        </div>
      )}
      {svgRight && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {svgRight}
        </div>
      )}
    </div>
  );
};

export default Input;
