import React, { useEffect, useRef } from 'react';
import { HSDropdown } from 'preline/preline';

type DropdownOption = {
  label: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  action?: (row: any) => void;
};

type DropdownButtonProps = {
  row: any;
  options: DropdownOption[];
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({ row, options, buttonText = "Action", children, className }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      HSDropdown.autoInit();
    }
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    option.action ? option.action(row) : null;
  };

  return (
    <div ref={dropdownRef} className={`relative inline-flex hs-dropdown [--placement:bottom-left] ${className}`}>
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 align-middle transition-all bg-white border border-gray-200 rounded-md shadow-sm hs-dropdown-toggle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-800 dark:border-gray-700 dark:hover:bg-slate-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        {buttonText}
        <svg
          className="w-2.5 h-2.5 text-gray-600"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-slate-800 dark:border dark:border-gray-700"
        aria-labelledby="hs-dropdown-custom-trigger"
      >
        {children} 
        {options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="flex items-center gap-x-3.5 py-2 w-full px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-300 dark:focus:bg-slate-700"
            style={{ color: option.color }}
          >
            {option.icon && <span>{option.icon}</span>}
            {option.label}
            {option.component && <span>{option.component}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownButton;
