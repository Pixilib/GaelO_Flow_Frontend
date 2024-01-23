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
    ? "bg-secondary text-dark"
    : "bg-inherit hover:bg-[#0C0B76] text-white";

  return (
    <div
      className={`flex justify-center p-2 bg-inherit ${activeClasses} ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{title}</span>
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
  return (
        <div className={`flex flex-col w-full justify-between ${className}`} onClick={toggleOpen}>
          <div className="flex justify-between p-3 text-dark">
            <span>{icon}</span>
            <span>{title}</span>
          <span>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
          </div>
          {isOpen && <Items items={items} onNavigate={onNavigate} />}
        </div>
      );
};
