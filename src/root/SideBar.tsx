import { IoMdHelpCircleOutline as HelpIcon } from "react-icons/io";
import { BiLogOut as LogoutIcon } from "react-icons/bi";
import { TbZoomQuestion as QueryIcon } from "react-icons/tb";
import { BiHomeAlt as HomeIcon } from "react-icons/bi";
import { RiUserSettingsLine as AdministratorIcon } from "react-icons/ri";
import { MdOutlineImageSearch as OrthancContentIcon } from "react-icons/md";
import { BiImport as ImportIcon } from "react-icons/bi";
import { MdOutlineRestorePage as RetrieveIcon } from "react-icons/md";
import { BiImageAdd as DicomIcon } from "react-icons/bi";

import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "../ui/menu/MenuItem";
import MenuItemsCollapse from "../ui/menu/MenuItemsCollapse";

import LogoSideBar from "../assets/logoGaeloFlow-white3.svg?react";
import { Item } from "../ui/menu/Items";
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
  const handleDropDown = (title: string) => {
    console.log()
    setOpenItem(openItem === title ? null : title);
  };
  //TODO: Add route for the adminItems, when route exist !
  const adminItems = [
    {
      title: "General",
      path: "/administration/general",
      isActive: location.pathname === "/administration/general",
    },
    {
      title: "Modalities",
      path: "/administration/modalities",
      isActive: location.pathname === "/administration/modalities",
    },
    {
      title: "Peers",
      path: "/administration/peers",
      isActive: location.pathname === "/administration/peers",
    },
    {
      title: "Queues",
      path: "/administration/queues/retrieve",
      isActive: location.pathname === "/administration/queues",
    },
    {
      title: "Jobs",
      path: "/administration/jobs",
      isActive: location.pathname === "/administration/jobs",
    },
    {
      title: "Users",
      path: "/administration/users/crud",
      isActive: location.pathname === "/administration/users/crud",
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
      className="w-64 h-full border-transparent rounded-tr-40 flex-shrink-0"
    >
      <main className="h-full rounded-tr-40 bg-primary pt-7">
        <div className="flex h-11% justify-center">
          <LogoSideBar />
        </div>
        <div className="flex h-69% flex-col gap-3 overflow-y-auto">
          <MenuItemsCollapse
            icon={<AdministratorIcon className="w-6 h-6" />}
            title="Administration"
            elements={adminItems}
            isOpen={openItem === "Administration"}
            dropDownOpen={() => handleDropDown("Administration")}
            onNavigate={handleItemClick}
          />
          <MenuItem
            title="Orthanc Content"
            icon={< OrthancContentIcon className="w-6 h-6" />}
            isActive={location.pathname === "/"}
            onClick={() => handleItemClick("/")}
          />
          <MenuItem
            title="Import"
            icon={<ImportIcon className="w-6 h-6" />}
            isActive={location.pathname === "/import"}
            onClick={() => handleItemClick("/import")}
          />
          <MenuItem
            title="Query"
            icon={<QueryIcon className="w-6 h-6" />}
            isActive={location.pathname === "/query"}
            onClick={() => handleItemClick("/query")}
          />
          <MenuItem
            title="Auto retrieve"
            icon={<RetrieveIcon className="w-6 h-6" />}
            isActive={location.pathname === "/auto-retrieve"}
            onClick={() => handleItemClick("/auto-retrieve")}
          />
          <MenuItem
            title="My Dicom"
            icon={<DicomIcon className="w-6 h-6" />}
            isActive={location.pathname === "/mydicom"}
            onClick={() => handleItemClick("/mydicom")}
          />
        </div>
        <div className="flex h-20% flex-col gap-2 border-t border-white">

          <MenuItem
            title="Home"
            icon={<HomeIcon className="w-6 h-6" />}
            isActive={location.pathname === "/home"}
            onClick={() => handleItemClick("/home")}
            className="mt-3"
          />
          <MenuItem
            title="Help"
            icon={<HelpIcon className="w-6 h-6" />}
            isActive={location.pathname === "/help"}
            onClick={() => handleItemClick("/help")}
          />
          <MenuItem
            title="Log out"
            icon={<LogoutIcon className="w-6 h-6" />}
            isActive={location.pathname === "/logout"}
            onClick={onLogout}
          />
        </div>
      </main>
    </nav>
  );
};
export default SideBar;
