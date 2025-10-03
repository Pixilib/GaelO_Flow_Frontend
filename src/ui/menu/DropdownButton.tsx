import React, { useEffect, useRef, useState } from 'react';
import { HSDropdown } from 'preline/preline';

type DropdownOption = {
  label?: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  action?: () => void;
};

type DropdownButtonProps = {
  options: DropdownOption[];
  buttonText?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, buttonText = "Action", children, className, ...props }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      HSDropdown.autoInit();
    }
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    option.action && option.action();
  };

  const handleDropdownClick = (e: React.MouseEvent, dropdownId: string) => {
    e.stopPropagation();
    if (activeDropdownId !== dropdownId) {
      const previousDropdownMenu = document.querySelector(`.hs-dropdown-menu#${activeDropdownId}`);
      if (previousDropdownMenu) {
        previousDropdownMenu.classList.add('hidden');
      }
      setActiveDropdownId(dropdownId);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      const dropdownMenu = dropdownRef.current.querySelector('.hs-dropdown-menu');
      if (dropdownMenu) {
        //dropdownMenu.classList.add('hidden');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} {...props} className={`relative inline-flex hs-dropdown [--placement:bottom-left] ${className}`}>
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 align-middle transition-all bg-white rounded-md shadow-xs hover:text-white hs-dropdown-togglefocus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary dark:bg-slate-700 dark:border-gray-700 dark:hover:bg-secondary hover:bg-secondary dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        {buttonText}
        <svg
          className="w-2.5 h-2.5 text-gray-600  dark:text-white"
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
        onClick={(e) => handleDropdownClick(e, 'dropdown-id')}
        className="hs-dropdown-menu !z-[999] transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-slate-800 dark:border dark:border-gray-700"
        aria-labelledby="hs-dropdown-custom-trigger"
        id="dropdown-id"
      >
        {children} 
        {options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="cursor-pointer flex items-center gap-x-3.5 py-2 w-full px-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-gray-300 dark:focus:bg-slate-700"
            style={{ color: option.color }}
          >
            {option.icon && <span>{option.icon}</span>}
            {option?.label}
            {option.component && <span>{option.component}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownButton;