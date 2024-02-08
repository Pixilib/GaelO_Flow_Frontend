import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import { Banner } from "../RenderComponents/Banner/Banner";
import { BannerDropDown } from '../RenderComponents/Banner/BannerDropDown';
import Items, { Item } from "../RenderComponents/Items/Items";

import ToogleChevron from "../RenderComponents/shared/ToogleChevron";

import Language from "../assets/language.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";

const RootApp = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  // const [settingsUser, setSettingsUser] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();




  const handleItemClick = (path: string) => {
    navigate(path);
  };


  const toggleOpen = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const isOpen = (item: string): boolean => openItem === item;
  const ItemsLanguage: Item[] = [
    { title: "English", path: "/english", isActive: location.pathname === "/english" },
    { title: "Français", path: "/francais", isActive: location.pathname === "/francais" },
  ];

  const ItemsSettingsUser: Item[] = [
    { title: "Profile", path: "/profile", isActive: location.pathname === "/profile" },
    { title: "Settings", path: "/settings", isActive: location.pathname === "/settings" },
  ];
  console.log({ name, openItem, isOpen, location })

  return (
    <div className="flex w-full h-full">
      <SideBar onLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Banner title={"Home"}>
          <div className="flex justify-end ">
            <BannerDropDown>
              <div className="inline-flex items-center w-full">
                <Language />
                <span className="mx-4">{selectedLanguage}</span>
                <ToogleChevron
                  isOpen={isOpen("Language")}
                  toggleOpen={() => toggleOpen("Language")}
                />
              </div>
              {isOpen("Language") && (
                <Items
                  variant={"BannerItems"}
                  items={ItemsLanguage}
                  onNavigate={handleItemClick}
                />
              )}
            </BannerDropDown>
            <BannerDropDown >
              <div className="inline-flex items-center w-full gap-4 ">
                <ToogleChevron
                  isOpen={isOpen("SettingsUser")}
                  toggleOpen={() => toggleOpen("SettingsUser")}
                />
                <Notification />
                <Settings />
              </div>
              {isOpen("SettingsUser") && (
                <Items
                  variant={"BannerItems"}
                  items={ItemsSettingsUser}
                  onNavigate={handleItemClick}
                />
              )}
            </BannerDropDown>

          </div>
        </Banner>

        <div className="flex">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/*" element={<AdminRoot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
