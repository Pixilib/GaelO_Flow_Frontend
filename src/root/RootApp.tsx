import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { SideBar } from "../RenderComponents/NavBar/SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import { Banner } from "../Banner";
import { BannerDropDown } from '../RenderComponents/Banner/BannerDropDown';
import { Item } from "../RenderComponents/Items/Items";

import ToogleChevron from "../RenderComponents/ToogleChevron";

import Language from "../assets/language.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";
import BannerItems from "../RenderComponents/Items/BannerItems";
import Profile from "../assets/user-banner.svg?react";
import useOutsideClick from "../utils/useOutsideClick";

const RootApp = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const languageDropdownRef = useRef<HTMLElement>(null);
  const settingsDropdownRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  const toggleOpen = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };
  useOutsideClick(languageDropdownRef, () => isOpen('Language') && toggleOpen('Language'));
  useOutsideClick(settingsDropdownRef, () => isOpen('SettingsUser') && toggleOpen('SettingsUser'));

  const isOpen = (item: string): boolean => openItem === item;
  const ItemsLanguage: Item[] = [
    { title: "English", path: "/english", isActive: location.pathname === "/english" },
    { title: "Français", path: "/francais", isActive: location.pathname === "/francais" },
  ];
  const ItemsSettingsUser: Item[] = [
    { title: "Profile", path: "/profile", isActive: location.pathname === "/profile" },
    { title: "Settings", path: "/settings", isActive: location.pathname === "/settings" },
  ];

  return (
    <div className="flex size-full">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} />
      <div className="flex flex-1 flex-col">
        <Banner title={"Home"}>
          <div className="flex justify-end ">
            <BannerDropDown>
              <div className="inline-flex w-full items-center">
                <Language />
                <span className="mx-4">{"English"}</span>
                <ToogleChevron
                  isOpen={isOpen("Language")}
                  toggleOpen={() => toggleOpen("Language")}
                  myRef={languageDropdownRef}
                />
              </div>
              {isOpen("Language") && (
                <BannerItems
                  elements={ItemsLanguage}
                  onNavigate={handleItemClick}
                />
              )}
            </BannerDropDown>
            <BannerDropDown >
              <div className="inline-flex w-full items-center gap-4 ">
                <ToogleChevron
                  isOpen={isOpen("SettingsUser")}
                  toggleOpen={() => toggleOpen("SettingsUser")}
                  myRef={settingsDropdownRef}
                />
                <Notification className="transition-transform duration-100 hover:scale-110" />
                <Settings className="transition-transform duration-100 hover:scale-110" />
                <Profile height={23}  fill="white" width={23} stroke="white" className="transition-transform duration-100 hover:scale-110"  />
              </div>
              {isOpen("SettingsUser") && (
                <BannerItems
                  elements={ItemsSettingsUser}
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
