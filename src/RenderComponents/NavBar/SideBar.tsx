import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MenuItem from "./MenuItem";
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
import MenuItemsCollapse from "./MenuItemsCollapse";

//TODO: Add route for the menu , when route exist !
export const SideBar = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
      path: "/",
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
      className="flex flex-col w-full h-full shadow-custom rounded-tr-40 bg-primary"
    >
      <main className="justify-between h-full content-between rounded-tr-40 top-0 start-0 bottom-0 border-radius-inherit z-[60] w-64 bg-primary pt-7 overflow-y-hidden">
        <LogoSideBar className="mx-auto mb-12 md:mb-28 lg:mb-32 xl:mb-32 2xl:mb-36 " />
        <div className="space-y-1 2xl:space-y-4">
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
        <div className="space-y-1 mt-28 md:mt-32 lg:mt-40 xl:mt-44 2xl:space-y-4">
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
            onClick={() => handleItemClick("/logout")}
          />
          
        </div>
      </main>
    </nav>
  );
};
export default SideBar;
