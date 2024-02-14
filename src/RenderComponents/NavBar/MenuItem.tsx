import { ReactNode } from "react";

type MenuItemProps = {
  icon?: ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

const MenuItem = ({
  icon,
  title,
  isActive,
  onClick,
  className,
}: MenuItemProps) => {
  //? Personnalize css if item is Active or not
  const activeClasses = isActive
    ? "bg-primary-active disabled cursor-not-allowed"
    : "cursor-pointer";

  return (
    <div
      className={`flex w-full items-start justify-start p-3 text-xs text-white hover:bg-primary-hover ${activeClasses} ${className}`}
      onClick={onClick}
      data-gaelo-flow="sidebar-item"
    >
      <span className="ml-4 mr-3 hover:mx-2">{icon}</span>
      <span >{title}</span>
    </div>
  );
};

export default MenuItem;
