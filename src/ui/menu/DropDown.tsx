import React, { useState } from "react";
import ToogleChevron from './ToogleChevron'

type DropDownProps = {
  chevronPosition?: "left" | "right";
  className?: string;
  isOpen?: boolean;
  dropDownOpen?: () => void;
  children: React.ReactNode;
  dropDown: React.ReactNode | boolean; // Change type of dropDown prop
};
const DropDown = ({ chevronPosition, children, className, isOpen: isOpenProp, dropDownOpen, dropDown }: DropDownProps) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);

  const isOpenUse = (isOpenProp !== undefined && dropDownOpen !== undefined);
  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;
  //define the setter if the prop is not defined and the state is used
  // const handleClick = dropDownOpen ? dropDownOpen : () => setIsOpenState(!isOpenState);
  // const handleBlur = () => setIsOpenState(false);
  
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
      data-gaelo-flow="banner-dropdown"
      className={`mx-4 flex place-content-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
      tabIndex={0}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <div className="flex items-center gap-4 place-content-center">
        {children}
        {typeof dropDown === 'boolean' && dropDown && (
          <div className="absolute p-2 bg-white rounded-md shadow-md top-full text-dark">
            <ul>
              <li>
                <input type="checkbox" id="option1" />
                <label htmlFor="option1">Option 1</label>
              </li>
              <li>
                <input type="checkbox" id="option2" />
                <label htmlFor="option2">Option 2</label>
              </li>
              <li>
                <input type="checkbox" id="option3" />
                <label htmlFor="option3">Option 3</label>
              </li>
            </ul>
          </div>
        )}
        {typeof dropDown !== 'boolean' && dropDown}
        {chevronPosition &&
          <ToogleChevron isOpen={isOpenUse === true ? isOpen: isOpenState} className={`${chevronPosition === "left" ? "order-first" : "order-last"} flex items-center`} onClick={dropDownOpen} />
        }
      </div>
    </div>
  );
};

export default DropDown;

