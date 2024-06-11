import React from "react";

type LabelDropDownProps = {
  children: React.ReactNode;
  isOpen: boolean;
  dropDownOpen: () => void;
  options: string[];
  onSelectOption: (option: string) => void;
};

const LabelDropDown: React.FC<LabelDropDownProps> = ({
  children,
  isOpen,
  dropDownOpen,
  options,
  onSelectOption,
}) => {
  return (
    <div className="relative inline-block text-center"> {/* Center the dropdown */}
      <div onClick={dropDownOpen}>
        {children}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-56 mt-2 origin-top transform -translate-x-1/2 bg-white rounded-md shadow-lg left-1/2 ring-1 ring-black ring-opacity-5"> {/* Center the dropdown */}
          <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <li key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" role="menuitem">
                <input
                  type="checkbox"
                  id={option}
                  onChange={() => onSelectOption(option)}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor={option}>{option}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LabelDropDown;
