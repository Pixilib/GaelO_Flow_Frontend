import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "../ui/menu/MenuItem";
import MenuItemsCollapse from "../ui/menu/MenuItemsCollapse";

import LogoSideBar from "../assets/logoGaeloFlow-white3.svg?react";
import { Item } from "../ui/menu/Items";
import { Admin, Directions, Help, Home, ImageAdd, ImageSearch, Import, Logout, RestorePage, ZoomQuestion } from "../icons";

type SideBarProps = {
  onLogout: () => void;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

const SideBar = ({ onLogout, openItem, setOpenItem }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (item: Item | string) => {
    const itemPath = typeof item === "string" ? item : item.path;
    navigate(itemPath);
  };

  const handleDropdown = (title: string) => {
    setOpenItem(openItem === title ? null : title);
  };

  const adminItems = [
    { title: "General", path: "/administration/general", isActive: location.pathname === "/administration/general" },
    { title: "Modalities", path: "/administration/modalities", isActive: location.pathname === "/administration/modalities" },
    { title: "Peers", path: "/administration/peers", isActive: location.pathname === "/administration/peers" },
    { title: "Queues", path: "/administration/queues/retrieve", isActive: location.pathname === "/administration/queues" },
    { title: "Jobs", path: "/administration/jobs", isActive: location.pathname === "/administration/jobs" },
    { title: "Users", path: "/administration/users/users", isActive: location.pathname === "/administration/users/crud" },
    { title: "Labels", path: "/administration/labels", isActive: location.pathname === "/administration/labels" },
  ];

  return (
    <nav
      data-gaelo-flow="sidebar"
      className="shrink-0 w-64 h-screen border-transparent rounded-tr-40"
    >
      <main className="flex flex-col h-full rounded-tr-40 bg-primary dark:bg-slate-950">
        {/* Logo */}
        <div className="flex justify-center py-4 ">
          <LogoSideBar className="h-16" />
        </div>

        {/* Contenu de la barre latérale avec défilement toujours visible */}
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-white scrollbar-track-transparent">
          <div className="flex flex-col gap-3">
            <MenuItemsCollapse
              icon={<Admin className="w-6 h-6" />}
              title="Administration"
              elements={adminItems}
              isOpen={openItem === "Administration"}
              dropDownOpen={() => handleDropdown("Administration")}
              onNavigate={handleItemClick}
            />
            <MenuItem
              title="Orthanc Content"
              icon={<ImageSearch className="w-6 h-6" />}
              isActive={location.pathname === "/orthanc-content"}
              onClick={() => handleItemClick("/orthanc-content")}
            />
            <MenuItem
              title="Import"
              icon={<Import className="w-6 h-6" />}
              isActive={location.pathname.includes("/import/")}
              onClick={() => handleItemClick("/import/upload")}
            />
            <MenuItem
              title="Query"
              icon={<ZoomQuestion className="w-6 h-6" />}
              isActive={location.pathname === "/query"}
              onClick={() => handleItemClick("/query")}
            />
            <MenuItem
              title="Auto retrieve"
              icon={<RestorePage className="w-6 h-6" />}
              isActive={location.pathname === "/auto-retrieve"}
              onClick={() => handleItemClick("/auto-retrieve")}
            />
            <MenuItem
              title="Auto routing"
              icon={<Directions className="w-6 h-6" />}
              isActive={location.pathname === "/auto-routing"}
              onClick={() => handleItemClick("/auto-routing")}
            />
            <MenuItem
              title="Datasets"
              icon={<ImageAdd className="w-6 h-6" />}
              isActive={location.pathname === "/datasets"}
              onClick={() => handleItemClick("/datasets")}
            />
          </div>
        </div>

        {/* Section bas de la barre latérale */}
        <div className="flex flex-col gap-2 border-t border-white">
          <MenuItem
            title="Home"
            icon={<Home className="w-6 h-6" />}
            isActive={location.pathname === "/"}
            onClick={() => handleItemClick("/")}
            className="mt-3"
          />
          <MenuItem
            title="Help"
            icon={<Help className="w-6 h-6" />}
            isActive={location.pathname === "/help"}
            onClick={() => handleItemClick("/help")}
          />
          <MenuItem
            title="Log out"
            icon={<Logout className="w-6 h-6" />}
            isActive={location.pathname === "/logout"}
            onClick={onLogout}
          />
        </div>
      </main>
    </nav>
  );
};

export default SideBar;
