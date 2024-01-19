import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoSideBar from "../../../public/LogoGaeloFlow-white 3.svg?react";
import Administrator from "../../assets/administrator_line_icon_236151 1 (1).svg?react";
import { MenuItem, MenuItemsCollapse } from "./MenuItem";

//TODO: Add a state for open and close
//TODO: make components items for menu and sub menu, take a prop for the icon and text
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

  const authItems = [
    {
      title: "Lost Password",
      path: "/lost-password",
      isActive: location.pathname === "/lost-password",
    },
    {
      title: "sign-up",
      path: "/signup",
      isActive: location.pathname === "/signup",
    },
    {
      title: "sign-in",
      path: "/",
      isActive: location.pathname === "/",
    },
  ];

  return (
    <nav data-gaelo-flow="sidebar" className="w-full h-full bg-background">
      <div className="h-full rounded-tr-3xl top-0 start-0 bottom-0 z-[60] w-64 bg-primary border-e  pt-7 pb-10 overflow-y-hidden lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 px-6">
        <LogoSideBar className="mx-auto mb-10" />
        <MenuItem
          title="Administration"
          icon={<Administrator />}
          isActive={location.pathname === "/lost-password"}
          onClick={() => handleItemClick("/lost-password")}
        />
        <MenuItemsCollapse
          icon={<Administrator />}
          title="Authentification"
          className="bg-secondary"
          items={authItems}
          isOpen={openItem === "Authentification"}
          toggleOpen={() => toggleOpen("Authentification")}
          onNavigate={handleItemClick}
        />
      </div>
    </nav>
  );
};
export default SideBar;
