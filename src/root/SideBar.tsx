import { useNavigate, useLocation } from "react-router-dom";

import MenuItem from "../ui/menu/MenuItem";
import MenuItemsCollapse from "../ui/menu/MenuItemsCollapse";

import LogoSideBar from "../assets/logoGaeloFlow-white3.svg?react";
import Administrator from "../assets/administrator.svg?react";
import Import from "../assets/import-content.svg?react";
import Search from "../assets/search.svg?react";
import SearchDocument from "../assets/search-document.svg?react";
import Auto from "../assets/auto-retrieve.svg?react";
import MyDicom from "../assets/my-dicom.svg?react";
import Home from "../assets/home.svg?react";
import Help from "../assets/help.svg?react";
import Logout from "../assets/logout.svg?react";
import { Item } from "../ui/menu/Items";

type SideBarProps = {
  onLogout: () => void;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

const SideBar = ({ onLogout, openItem, setOpenItem }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (item: Item|string) => {
    const itemPath = typeof item === "string" ? item : item.path;
    console.log(itemPath)
    navigate(itemPath);
  };
  const handleDropDown = (title: string) => {
    console.log()
    setOpenItem(openItem === title ? null : title);
  };

  //TODO: Add route for the adminItems , when route exist !
  const adminItems = [
    {
      title: "General",
      path: "/administration/general",
      isActive: location.pathname === "/administration/general",
    },
    {
      title: "Aets",
      path: "/administration/aets",
      isActive: location.pathname === "/administration/aets",
    },
    {
      title: "Peers",
      path: "/administration/peers",
      isActive: location.pathname === "/administration/peers",
    },
    {
      title: "Queues",
      path: "/administration/queues",
      isActive: location.pathname === "/administration/queues",
    },
    {
      title: "Jobs",
      path: "/administration/jobs",
      isActive: location.pathname === "/administration/jobs",
    },
    {
      title: "Users",
      path: "/administration/users",
      isActive: location.pathname === "/administration/users",
    },
    {
      title: "Labels",
      path: "/administration/labels",
      isActive: location.pathname === "/administration/labels",
    },
  ];
  
  return (
    <nav
      data-gaelo-flow="sidebar"
      className="w-64 h-full border-transparent rounded-tr-40 shadow-custom"
    >
      <main className="h-full rounded-tr-40 bg-primary pt-7">
        <div className="flex h-11% justify-center">
          <LogoSideBar />
        </div>
        <div className="flex h-69% flex-col gap-3 overflow-y-auto">
          <MenuItemsCollapse
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
            onClick={()=>handleItemClick("/import")}
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
            isActive={location.pathname === "/auto-retrieve"}
            onClick={() => handleItemClick("/auto-retrieve")}
          />
          <MenuItem
            title="My Dicom"
            icon={<MyDicom />}
            isActive={location.pathname === "/mydicom"}
            onClick={() => handleItemClick("/mydicom")}
          />
        </div>
        <div className="flex h-20% flex-col gap-2 border-t border-white">

          <MenuItem
            title="Home"
            icon={<Home />}
            isActive={location.pathname === "/home"}
            onClick={() => handleItemClick("/home")}
            className="mt-3"
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
