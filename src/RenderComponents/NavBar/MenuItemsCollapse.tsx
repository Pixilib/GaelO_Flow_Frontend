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
  const bgIsOpen = isOpen ? "bg-primary-hover" : "hover:bg-primary-hover";
  return (
    <div
      className={`flex w-full cursor-context-menu flex-col text-sm ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
    >
      <div className={`flex justify-between p-3 text-white ${bgIsOpen}`}>
        <div className={`ml-4 flex grow items-center`}>
          <span className="mr-3">{icon}</span>
          <span className="grow">{title}</span>
        </div>
        <ToogleChevron className={"mr-4 shrink-0"} isOpen={isOpen} toggleOpen={toggleOpen} />
      </div>
      {isOpen && <SideBarItems elements={elements} onNavigate={onNavigate} />}
    </div>
  );
}
export default MenuItemsCollapse;