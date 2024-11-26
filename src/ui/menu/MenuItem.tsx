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
    ? "bg-primary-active dark:bg-indigo-800 p-2.5 ml-3 disabled cursor-not-allowed rounded-lg"
    : "cursor-pointer hover:bg-primary-light dark:hover:bg-indigo-500 p-2.5 ml-3 ";

  return (
    <div
      className={`mx-auto flex w-full justify-start gap-3 text-xs text-white ${className}`}
      onClick={onClick}
      data-gaelo-flow="sidebar-item"
    >
      <div className={`flex ${activeClasses} mr-3 grow items-center rounded-lg`}>
      <span className="ml-4 mr-5">{icon}</span>
      <span >{title}</span>
      </div>
    </div>
  );
};

export default MenuItem;
