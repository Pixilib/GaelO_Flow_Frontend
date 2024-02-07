import { useState } from "react";
import { useNavigate, useLocation, Location} from "react-router-dom";

import type { LocationState } from "../../root/RootApp";
import MenuItem from "./MenuItem";
import MenuItemsCollapse from "./MenuItemsCollapse";

import LogoSideBar from "../../assets/logoGaeloFlow-white3.svg?react";
import Administrator from "../../assets/administrator.svg?react";
import Import from "../../assets/import-content.svg?react";
import Search from "../../assets/search.svg?react";
import SearchDocument from "../../assets/search-document.svg?react";
import Auto from "../../assets/auto-retrieve.svg?react";
import MyDicom from "../../assets/my-dicom.svg?react";
import Home from "../../assets/home.svg?react";
import Help from "../../assets/help.svg?react";
import Logout from "../../assets/logout.svg?react";

type SideBarProps = {
  onLogout: () => void;
};

export const SideBar = ({ onLogout }: SideBarProps) => {

//TODO: Add route for the menu , when route exist !
  const [openItem, setOpenItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const toggleOpen = (title: string) => {
    setOpenItem(openItem === title ? null : title);
  };

  //TODO: Add route for the adminItems , when route exist !
  const adminItems = [
    {
      title: "Aets",
      path: "/aets",
      isActive: location.pathname === "/",
    },
    {
      title: "Peers",
      path: "/peers",
      isActive: location.pathname === "/peers",
    },
    {
      title: "External endpoints",
      path: "/external-endpoints",
      isActive: location.pathname === "/external-endpoints",
    },
    {
      title: "Robot & Tasks",
      path: "/robot-tasks",
      isActive: location.pathname === "/robot-tasks",
    },
    {
      title: "Jobs",
      path: "/jobs",
      isActive: location.pathname === "/jobs",
    },
    {
      title: "Users",
      path: "/users",
      isActive: location.pathname === "/users",
    },
    {
      title: "Labels",
      path: "/labels",
      isActive: location.pathname === "/",
    },
  ];
  return (
    <nav
      data-gaelo-flow="sidebar"
      className="w-64 h-full border-transparent bg-primary shadow-custom rounded-tr-40"
    >
      <main className="h-full overflow-hidden rounded-tr-40 pt-7">
        <div className="flex justify-center h-15%">
          <LogoSideBar/>          
        </div>
        <div className="flex flex-col h-60%">
          <MenuItemsCollapse
            icon={<Administrator />}
            title="Administration"
            items={adminItems}
            isOpen={openItem === "Administration"}
            toggleOpen={() => toggleOpen("Administration")}
            onNavigate={handleItemClick}
          />
          <MenuItem
            title="Orthanc Content"
            icon={<Search />}
            isActive={location.pathname === "/"}
            onClick={() => handleItemClick("/")}
          />
          <MenuItem
            title="Import"
            icon={<Import />}
            isActive={location.pathname === "/import"}
            onClick={() => handleItemClick("/")}
          />
          <MenuItem
            title="Query"
            icon={<SearchDocument />}
            isActive={location.pathname === "/query"}
            onClick={() => handleItemClick("/query")}
          />
          <MenuItem
            title="Auto retrieve"
            icon={<Auto />}
            isActive={location.pathname === "/query"}
            onClick={() => handleItemClick("/query")}
          />
          <MenuItem
            title="My Dicom"
            icon={<MyDicom />}
            isActive={location.pathname === "/mydicom"}
            onClick={() => handleItemClick("/mydicom")}
          />
        </div>
        <div className="flex flex-col justify-end h-auto pb-4">
          <MenuItem
            title="Home"
            icon={<Home />}
            isActive={location.pathname === "/home"}
            onClick={() => handleItemClick("/home")}
          />
          <MenuItem
            title="Help"
            icon={<Help />}
            isActive={location.pathname === "/help"}
            onClick={() => handleItemClick("/help")}
          />
          <MenuItem
            title="Log out"
            icon={<Logout />}
            isActive={location.pathname === "/logout"}
            onClick={onLogout}
          />
          
        </div>
      </main>
    </nav>
  );
};
export default SideBar;
