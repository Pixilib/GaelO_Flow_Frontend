import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MenuItem from "./RenderComponents/Menu/MenuItem";
import MenuItemsCollapse from "./RenderComponents/Menu/MenuItemsCollapse";

import LogoSideBar from  "./assets/logoGaeloFlow-white3.svg?react";
import Administrator from "./assets/administrator.svg?react";
import Import from "./assets/import-content.svg?react";
import Search from "./assets/search.svg?react";
import SearchDocument from "./assets/search-document.svg?react";
import Auto from "./assets/auto-retrieve.svg?react";
import MyDicom from "./assets/my-dicom.svg?react";
import Home from "./assets/home.svg?react";
import Help from "./assets/help.svg?react";
import Logout from "./assets/logout.svg?react";
import useOutsideClick from "./utils/useOutsideClick";

type SideBarProps = {
  onLogout: () => void;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

export const SideBar = ({ onLogout, openItem, setOpenItem }: SideBarProps) => {
  const adminMenuRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useOutsideClick(adminMenuRef, () => {
    if (openItem === "Administration") {
      setOpenItem(null);
    }
  });
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  const handleDropDown = (title: string) => {
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
      isActive: location.pathname === "/labels",
    },
  ];

  return (
    <nav
      data-gaelo-flow="sidebar"
      className="h-full w-64 rounded-tr-40 border-transparent bg-primary shadow-custom"
    >
      <main className="h-full rounded-tr-40 pt-7">
        <div className="flex h-11% justify-center">
          <LogoSideBar />
        </div>
        <div className="flex h-69% flex-col overflow-y-auto">
          <MenuItemsCollapse
            myRef={adminMenuRef}
            icon={<Administrator />}
            title="Administration"
            elements={adminItems}
            isOpen={openItem === "Administration"}
            dropDownOpen={() => handleDropDown("Administration")}
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
        <div className="flex h-20% flex-col">
          <MenuItem
            title="Home"
            icon={<Home />}
            isActive={location.pathname === "/home"}
            onClick={() => handleItemClick("/home")}
            className="mt-1"
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
