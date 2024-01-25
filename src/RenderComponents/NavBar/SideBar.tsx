import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MenuItem  from "./MenuItem";
import LogoSideBar from "../../assets/LogoGaeloFlow-white3.svg?react";
import Administrator from "../../assets/administrator_line_icon_236151 1 (1).svg?react";
import Search from "../../assets/search.svg?react";
import MenuItemsCollapse from "./MenuItemsCollapse";

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
      path: "/sign-up",
      isActive: location.pathname === "/sign-up",
    },
    {
      title: "sign-in",
      path: "/",
      isActive: location.pathname === "/",
    },
  ];

  return (
    <nav
      data-gaelo-flow="sidebar"
      className="flex flex-col w-full h-full shadow-custom"
    >
      <div className="h-full justify-center rounded-tr-3xl top-0 start-0 bottom-0 z-[60] w-64 bg-primary pt-7 pb-10 overflow-y-hidden">
        <LogoSideBar className="mx-auto mb-40" />
        <section className="space-y-7">
          <MenuItemsCollapse
            icon={<Administrator />}
            title="Administration"
            items={authItems}
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
