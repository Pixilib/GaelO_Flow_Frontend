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

export default MenuItem;