import { useState } from "react";
import ToogleChevron from './ToogleChevron'

type DropDownProps = {
  chevronPosition?: "left" | "right";
  className?: string;
  isOpen?: boolean;
  dropDownOpen?: () => void;
  children: React.ReactNode;
  dropDown: React.ReactNode;
};
const DropDown = ({ chevronPosition, children, className, isOpen:isOpenProp, dropDownOpen, dropDown }: DropDownProps) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  
  const isOpenUse = (isOpenProp  && dropDownOpen) !== undefined ? true: false;
  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;
  //define the setter if the prop is not defined and the state is used
  // const handleClick = dropDownOpen ? dropDownOpen : () => setIsOpenState(!isOpenState);
  // const handleBlur = () => setIsOpenState(false);
  
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    isOpenUse ? dropDownOpen && dropDownOpen() : setIsOpenState(true);
  };
  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    isOpenUse ? dropDownOpen && dropDownOpen() : setIsOpenState(!isOpenState);
  };
  
  return (
    <div
      data-gaelo-flow="banner-dropdown"
      className={`mx-4 flex place-content-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
      tabIndex={0}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <div className="flex place-content-center items-center gap-4">
        {children}
        {dropDown}
        {chevronPosition &&
          <ToogleChevron isOpen={isOpenUse === true ? isOpen: isOpenState} className={`${chevronPosition === "left" ? "order-first" :"order-last"} flex items-center`} onClick={dropDownOpen} />
        }
      </div>
    </div>
  );
};
export default DropDown;
