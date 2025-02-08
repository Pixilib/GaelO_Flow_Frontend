import React, { useState, forwardRef } from "react";
import ToogleChevron from './ToogleChevron';

type DropdownProps = {
  chevronPosition?: "left" | "right";
  className?: string;
  isOpen?: boolean;
  dropDownOpen?: () => void;
  children: React.ReactNode;
  dropDown: React.ReactNode | boolean;
};

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ chevronPosition, children, className, isOpen: isOpenProp, dropDownOpen, dropDown }, ref) => {
    const [isOpenState, setIsOpenState] = useState<boolean>(false);

    const isOpenUse = (isOpenProp !== undefined && dropDownOpen !== undefined);
    const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      isOpenUse ? dropDownOpen && dropDownOpen() : setIsOpenState(!isOpenState);
    };

    const handleBlur = (event: React.FocusEvent) => {
      event.stopPropagation();
      isOpenUse ? dropDownOpen && dropDownOpen() : setIsOpenState(false);
    };

    return (
      <div
        ref={ref}
        data-gaelo-flow="banner-dropdown"
        className={`mx-4 flex place-content-center rounded-18 border-transparent bg-primary dark:bg-indigo-600 px-4 py-3 font-semibold text-white ${className}`}
        tabIndex={0}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <div className="flex items-center gap-6 place-content-center">
          {children}
          {dropDown}
          {chevronPosition && (
            <ToogleChevron
              isOpen={isOpenUse ? isOpen : isOpenState}
              className={`${chevronPosition === "left" ? "order-first" : "order-last"} flex items-center`}
              onClick={dropDownOpen}
            />
          )}
        </div>
      </div>
    );
  }
);

export default Dropdown;
