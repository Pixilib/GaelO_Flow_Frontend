import { ReactNode } from "react";
import Items, { Item } from "./Items";
import { VariantItem } from "./ItemsVariant";
import ToogleChevron from "../shared/ToogleChevron";
import ChevronDown from "../../assets/chevron-down.svg?react";
import ChevronUp from "../../assets/chevron-up.svg?react";

type MenuItemCollapseProps = {
  icon?: ReactNode;
  title: string;
  items: Item[];
  isOpen: boolean;
  toggleOpen: () => void;
  onNavigate: (path: string) => void;
  className?: string;
};

const MenuItemsCollapse = ({
  icon,
  title,
  items,
  isOpen,
  className,
  toggleOpen,
  onNavigate,
}: MenuItemCollapseProps) => {
  //? Personnalize css if Menu is Open or not
  const bgIsOpen = isOpen ? "bg-primary-hover" : "hover:bg-primary-hover";
  return (
    <div
      className={`flex flex-col w-full cursor-context-menu text-sm ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
    >
      <div className={`flex justify-between p-3 text-white ${bgIsOpen}`}>
        <div className={`flex items-center flex-grow ml-4`}>
          <span className="mr-3">{icon}</span>
          <span className="flex-grow">{title}</span>
        </div>
        <ToogleChevron className={"flex-shrink-0 mr-4"} isOpen={isOpen} toggleOpen={toggleOpen}/>
      </div>
      {isOpen && <Items variant={VariantItem.SideBarItems} items={items} onNavigate={onNavigate} />}
    </div>
  );
}
export default MenuItemsCollapse;