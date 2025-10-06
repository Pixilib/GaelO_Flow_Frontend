import { ReactNode } from "react";
import { Item } from "./Items";
import SideBarItems from "./SideBarItems";

import ToggleChevron from "./ToggleChevron";

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
  const bgIsOpen = isOpen ? "bg-primary-active" : "hover:bg-primary-light";

  const handleClick = () => {
    dropDownOpen();
  }

  return (
    <div
      className={`flex w-full flex-col text-xs text-white ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
      onClick={handleClick}
      tabIndex={-1}
    >
      <div className="flex justify-start gap-3 mx-auto hover:cursor-pointer "  >
        <div className={`${bgIsOpen} mx-auto flex p-2.5 rounded-lg`}>
          <div className="flex items-center mx-3 grow">
            <span className="ml-1">{icon}</span>
            <span className="ml-5 mr-4">{title}</span>
          </div>
          <ToggleChevron className={"ml-6 flex shrink-0 items-center"} isOpen={isOpen} />
        </div>
      </div>
      {isOpen && <SideBarItems elements={elements} onNavigate={onNavigate} />}
    </div>
  );
}
export default MenuItemsCollapse;