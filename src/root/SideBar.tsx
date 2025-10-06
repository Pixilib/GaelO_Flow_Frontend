import { useNavigate, useLocation } from "react-router";
import MenuItem from "../ui/menu/MenuItem";
import MenuItemsCollapse from "../ui/menu/MenuItemsCollapse";

import { Item } from "../ui/menu/Items";
import { Admin, Cd, Directions, Help, Home, ImageAdd, ImageSearch, Import, Logout, RestorePage, ZoomQuestion } from "../icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { LogoGaeloFlowWhite } from "../assets";
import { useTranslation } from "react-i18next";
import MainTour from "../tour/tours/MainTour";

type SideBarProps = {
  onLogout: () => void;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

const SideBar = ({ onLogout, openItem, setOpenItem }: SideBarProps) => {

  const navigate = useNavigate();
  const location = useLocation();

  const role = useSelector((state: RootState) => state.user.role);
  const { t } = useTranslation()

  const handleItemClick = (item: Item | string) => {
    const itemPath = typeof item === "string" ? item : item.path;
    navigate(itemPath);
  };

  const handleDropdown = (title: string) => {
    setOpenItem(openItem === title ? null : title);
  };

  const adminItems = [
    { title: "General", path: "/administration/general/redis", isActive: location.pathname.includes("/administration/general") },
    { title: "Modalities", path: "/administration/modalities", isActive: location.pathname === "/administration/modalities" },
    { title: "Peers", path: "/administration/peers", isActive: location.pathname === "/administration/peers" },
    { title: "Queues", path: "/administration/queues/retrieve", isActive: location.pathname === "/administration/queues" },
    { title: "Jobs", path: "/administration/jobs", isActive: location.pathname === "/administration/jobs" },
    { title: "Users", path: "/administration/users/users", isActive: location.pathname === "/administration/users/crud" },
    { title: "Labels", path: "/administration/labels", isActive: location.pathname === "/administration/labels" },
    { title: "CD Burner", path: "/administration/cd-burner", isActive: location.pathname === "/administration/cd-burner" },
  ];

  return (
    <nav
      data-gaelo-flow="sidebar"
      className="shrink-0 w-64 h-screen border-transparent rounded-tr-40"
    >
      <main className="flex flex-col h-full rounded-tr-40 bg-primary dark:bg-slate-950">
        {/* Logo */}
        <div className="flex justify-center py-4 h-25 ">
          <LogoGaeloFlowWhite />
        </div>

        {/* Contenu de la barre latérale avec défilement toujours visible */}

        <div
        data-gaelo-flow="menu-content" 
        className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-white scrollbar-track-transparent">
          <div className="flex flex-col gap-3">
            {role.admin && (
              <MenuItemsCollapse
                icon={<Admin className="w-6 h-6" />}
                title="Administration"
                elements={adminItems}
                isOpen={openItem === "Administration"}
                dropDownOpen={() => handleDropdown("Administration")}
                onNavigate={handleItemClick}
              />
            )}
            {role.readAll && (
              <MenuItem
                title={t("content")}
                icon={<ImageSearch className="w-6 h-6" />}
                isActive={location.pathname === "/content"}
                onClick={() => handleItemClick("/content")}
              />
            )}
            {role.import && (
              <MenuItem
                title={t("Import")}
                icon={<Import className="w-6 h-6" />}
                isActive={location.pathname.includes("/import/")}
                onClick={() => handleItemClick("/import/upload")}
              />
            )}
            {role.query && (
              <MenuItem
                title={t("Query")}
                icon={<ZoomQuestion className="w-6 h-6" />}
                isActive={location.pathname === "/query"}
                onClick={() => handleItemClick("/query")}
              />
            )}
            {role.autoQuery && (
              <MenuItem
                title="Auto retrieve"
                icon={<RestorePage className="w-6 h-6" />}
                isActive={location.pathname === "/auto-retrieve"}
                onClick={() => handleItemClick("/auto-retrieve")}
              />
            )}
            {role.cdBurner && (
              <MenuItem
                title={t("cd-burner")}
                icon={<Cd className="w-6 h-6" />}
                isActive={location.pathname === "/cd-burner"}
                onClick={() => handleItemClick("/cd-burner")}
              />
            )}
            {role.autoRouting && (
              <MenuItem
                title="Auto routing"
                icon={<Directions className="w-6 h-6" />}
                isActive={location.pathname === "/auto-routing"}
                onClick={() => handleItemClick("/auto-routing")}
              />
            )}
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
            title={t("home")}
            icon={<Home className="w-6 h-6" />}
            isActive={location.pathname === "/"}
            onClick={() => handleItemClick("/")}
            className="mt-3"
          />
<MainTour />
          <MenuItem
            title={t("About")}
            icon={<Help className="w-6 h-6" />}
            isActive={location.pathname === "/about"}
            onClick={() => handleItemClick("/about")}
          />
          <MenuItem
            title={t("log-out")}
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
