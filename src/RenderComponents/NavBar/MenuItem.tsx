import { ReactNode } from "react";
import Items, { Item } from "./Items";
import ChevronDown from "../../assets/chevron-down.svg?react";
import ChevronUp from "../../assets/chevron-up.svg?react";

type MenuItemProps = {
  icon?: ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export const MenuItem = ({
  icon,
  title,
  isActive,
  onClick,
  className,
}: MenuItemProps) => {
  const activeClasses = isActive
    ? "text-white underline decoration-white decoration-2"
    : "bg-inherit hover:bg-[#0C0B76] text-white";

  return (
    <div
      className={`flex items-start justify-start w-full p-3 bg-inherit ${activeClasses} ${className}`}
      onClick={onClick}
      data-gaelo-flow="sidebar-item"
    >
      <span className="ml-4 mr-2">{icon}</span>
      <span className="">{title}</span>
    </div>
  );
};

type MenuItemCollapseProps = {
  icon?: ReactNode;
  title: string;
  items: Item[];
  isOpen: boolean;
  toggleOpen: () => void;
  onNavigate: (path: string) => void;
  className?: string;
};


export const MenuItemsCollapse = ({
  icon,
  title,
  items,
  isOpen,
  className,
  toggleOpen,
  onNavigate,
}: MenuItemCollapseProps) => {
  const bgIsOpen = isOpen ? "bg-inherit hover:bg-[#0C0B76] bg-inherit" : "";
  return (
    <div
      className={`flex flex-col w-full ${className}`}
      onClick={toggleOpen}
      data-gaelo-flow="sidebar-item-collapse"
    >
      <div className={`flex justify-between p-3 text-white ${bgIsOpen}`}>
        
        <div className={`flex items-center flex-grow ml-4`}>
          <span className="mr-2">{icon}</span>
          <span className="flex-grow">{title}</span>
        </div>
        <span className="flex-shrink-0">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        
      </div>
      {isOpen && <Items items={items} onNavigate={onNavigate} />}
    </div>
  );
};
