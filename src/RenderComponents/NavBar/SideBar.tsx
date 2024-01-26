import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MenuItem from "./MenuItem";
import LogoSideBar from "../../assets/LogoGaeloFlow-white3.svg?react";
import Administrator from "../../assets/administrator.svg?react";
import Search from "../../assets/search.svg?react";
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
      path: "/",
      isActive: location.pathname === "/",
    },
    {
      title: "External endpoints",
      path: "/",
      isActive: location.pathname === "/",
    },
    {
      title: "Robot & tasks",
      path: "/",
      isActive: location.pathname === "/",
    },
  ];

  return (
    <nav
      data-gaelo-flow="sidebar"
      className="flex flex-col w-full h-full shadow-custom rounded-tr-3xl bg-primary"
    >
      <div className="h-full justify-center rounded-tr-3xl top-0 start-0 bottom-0 z-[60] w-64 bg-primary pt-7 pb-10 overflow-y-hidden">
        <LogoSideBar className="mx-auto mb-40" />
        <section className="space-y-7">
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
            icon={<Search />}
            isActive={location.pathname === "/"}
            onClick={() => handleItemClick("/")}
          />
          <MenuItem
            title="Administration"
            icon={<Administrator />}
            isActive={location.pathname === "/lost-password"}
            onClick={() => handleItemClick("/lost-password")}
          />
        </section>
      </div>
    </nav>
  );
};
export default SideBar;
