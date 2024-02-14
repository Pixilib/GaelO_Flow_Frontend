import { ReactNode } from "react";
import { Item } from "../Items/Items";
import ToogleChevron from "../ToogleChevron";
import SideBarItems from "../Items/SideBarItems";

type MenuItemCollapseProps = {
  icon?: ReactNode;
  title: string;
  elements: Item[];
  isOpen: boolean;
  toggleOpen: () => void;
  onNavigate: (path: string) => void;
  className?: string;
};

const MenuItemsCollapse = ({
  icon,
  title,
  elements,
  isOpen,
  className,
  toggleOpen,
  onNavigate,
}: MenuItemCollapseProps) => {
  //? Personnalize css if Menu is Open or not
  const bgIsOpen = isOpen ? "bg-primary-hover" : "";
  return (
    <div
      className={`flex w-full cursor-context-menu flex-col ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
    >
      <div className={`flex justify-between p-3 ${bgIsOpen}`}>
        <div className="ml-4 flex grow items-center">
          <span className="mr-3">{icon}</span>
          <span className="grow text-xs text-white transition-all duration-100 hover:text-sm ">{title}</span>
        </div>
        <ToogleChevron className={"mr-4 shrink-0"} isOpen={isOpen} toggleOpen={toggleOpen} />
      </div>
      {isOpen && <SideBarItems elements={elements} onNavigate={onNavigate} />}
    </div>
  );
}
export default MenuItemsCollapse;