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
  onNavigate: (path: string) => void;
  className?: string;
  myRef: React.Ref<HTMLUListElement>;
};

const MenuItemsCollapse = ({
  icon,
  title,
  elements,
  myRef,
  isOpen,
  className,
  dropDownOpen,
  onNavigate,
}: MenuItemCollapseProps) => {
  //? Personnalize css if Menu is Open or not
  const bgIsOpen = isOpen ? "bg-primary-active" : "";
  return (
    <div
      className={`flex w-full cursor-context-menu flex-col ${className}`}
      data-gaelo-flow="sidebar-item-collapse"
    >
      <div className={`flex justify-between p-2.5 ${bgIsOpen}`}>
        <div className="ml-4 flex grow items-center">
          <span className="mr-3">{icon}</span>
          <span className="grow text-xs text-white">{title}</span>
        </div>
        <ToogleChevron  className={"mr-4 shrink-0"} isOpen={isOpen} dropDownOpen={dropDownOpen} />
      </div>
      {isOpen && <SideBarItems myRef={myRef} elements={elements} onNavigate={onNavigate} />}
    </div>
  );
}
export default MenuItemsCollapse;