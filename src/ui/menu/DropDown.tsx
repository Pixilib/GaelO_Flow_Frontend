import { useState } from "react";
import ToogleChevron from './ToogleChevron'

type DropDownProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  dropDownOpen: () => void;
  dropDown: React.ReactNode;
};

const DropDown = ({ children, className, dropDown }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    console.log('handleClick')
    setIsOpen(true);
  };

  const handleBlur = () => {
    console.log('handleBlur')
    setIsOpen(false);
  };

  return (
    <div
      data-gaelo-flow="banner-dropdown"
      className={`inline-flex items-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
      tabIndex={0}
      onClick={handleClick}
      onBlur={handleBlur}
      >
      {<ToogleChevron isOpen={isOpen} className="inline-flex" />}
      {children}
      {dropDown}
    </div>
  );
};

export default DropDown;
