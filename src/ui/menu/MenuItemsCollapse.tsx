import { ReactNode } from "react";
import { Item } from "./Items";
import SideBarItems from "./SideBarItems";

import ToogleChevron from "./ToogleChevron";

type MenuItemCollapseProps = {
  icon?: ReactNode;
  title: string;
  elements: Item[];
  isOpen: boolean;
  dropDownOpen: () => void;
  onNavigate: (item: Item) => void;
  className?: string;
};
const MenuItemsCollapse = ({
  icon,
  title,
  elements,
  isOpen,
  className,
  dropDownOpen,
  onNavigate
}: MenuItemCollapseProps) => {
  //? Personnalize css if Menu is Open or not
  const bgIsOpen = isOpen ? "bg-primary-active rounded-lg p-2.5" : "p-2.5 hover:bg-primary-hover rounded-lg";

const handleClick = () => {
  dropDownOpen(); 
}

  return (
    <div
      className={`flex w-full cursor-context-menu flex-col text-xs text-white ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
      onClick={handleClick}
      tabIndex={-1}
    >
      <div className="flex justify-start gap-3 mx-auto"  >
        <div className={`${bgIsOpen} mx-auto flex`}>
        <div className="flex items-center mx-3 grow">
          <span className="-ml-0.5 mr-5">{icon}</span>
          <span>{title}</span>
        </div>
        <ToogleChevron  className={"ml-7 flex shrink-0 items-center"} isOpen={isOpen} />
      </div>
        </div>
      {isOpen && <SideBarItems elements={elements} onNavigate={onNavigate} />}
    </div>      
  );
}
export default MenuItemsCollapse;