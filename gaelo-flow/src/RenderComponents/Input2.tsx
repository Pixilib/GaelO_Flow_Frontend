import React, { useState } from "react";

type InputProps = {
  className?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  svgLeft?: React.ReactNode;
  svgRight?: React.ReactNode;
  [key: string]: any;
};

const Input2 = ({
  className = "",
  placeholder = "",
  label = "",
  type = "text",
  svgLeft = null,
  svgRight = null,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <div className={`relative flex flex-col ${className}`}>
      {label && (
        <legend
          className={`transition-all duration-100 ease-in-out
                      ${
                        isFocused
                          ? "text-xs text-gray-800 absolute -top-2 left-5 bg-white px-1"
                          : "font-bold -top-4 left-0"
                      }`}
        >
          {label}
        </legend>
      )} 
      <input
        type={type}
        placeholder={isFocused ? "" : placeholder}
        className={
          `pl-12 pr-12 py-5 bg-gray-100 focus:bg-white text-gray-800 w-full text-sm border-2 border-gray-300 rounded-lg outline-none focus:border-purpleCustom focus:ring-purpleCustom disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" +
          " " + ${className}`
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {!isFocused && svgLeft && (
        <div className="absolute inset-y-0 pt-5 left-0 flex items-center pl-4">
          {svgLeft}
        </div>
      )}
      {svgRight && (
        <div className="absolute inset-y-0 pt-5 right-0 flex items-center pr-4">
          {svgRight}
        </div>
      )}
    </div>
  );
};

export default Input2;
