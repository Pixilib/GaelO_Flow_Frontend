import React, { useState } from "react";

type DropDownProps = {
  className?: string;
  children: React.ReactNode;
  content: React.ReactNode; // Change type of dropDown prop
};
const DropDown = ({ children, className, content }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      data-gaelo-flow="banner-dropdown"
      className={`mx-4 flex place-content-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
      tabIndex={0}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <div className="flex items-center gap-4 place-content-center">
        {children}
      </div>
      {isOpen ? content : null}
    </div>
  );
};

export default DropDown;

