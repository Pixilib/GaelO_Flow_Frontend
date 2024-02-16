import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { SideBar } from "../SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import { Banner } from "../Banner";
import { BannerDropDown } from '../RenderComponents/Banner/BannerDropDown';
import { Item } from "../RenderComponents/Items/Items";
import ToggleSwitch from "../RenderComponents/ToggleSwitch";

import ToogleChevron from "../RenderComponents/ToogleChevron";
import Language from "../assets/language.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";
import BannerItems from "../BannerItems";
import Profile from "../assets/user-banner.svg?react";
import useOutsideClick from "../utils/useOutsideClick";

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const languageDropdownRef = useRef<HTMLUListElement>(null);
  const settingsDropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(languageDropdownRef, () => isOpen('Language') && handleDropDown('Language'));
  useOutsideClick(settingsDropdownRef, () => isOpen('SettingsUser') && handleDropDown('SettingsUser'));

  const handleSwitchMode = () => {
    setIsToggled(!isToggled);
  }
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleDropDown = (name: string) => {
    setOpenItem(openItem === name ? null : name);
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

  return (
    <div className="flex size-full">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} />
      <div className="flex flex-1 flex-col">
        <Banner title={"Home"}>
          <div className="flex justify-end ">
            <BannerDropDown className="flex w-40 flex-col">
              <div className="inline-flex w-full items-center">
                <Language />
                <span className="mx-4">{"English"}</span>
                <ToogleChevron
                  isOpen={isOpen("Language")}
                  dropDownOpen={() => handleDropDown("Language")}
                />
              </div>
              {isOpen("Language") && (
                <BannerItems
                  elements={ItemsLanguage}
                  onNavigate={handleItemClick}
                  className="w-36"
                  myRef={languageDropdownRef}
                />
              )}
            </BannerDropDown>
            <BannerDropDown className="flex w-60 flex-col" >
              <div className="inline-flex w-full items-center gap-4">
                <ToogleChevron
                  isOpen={isOpen("SettingsUser")}
                  dropDownOpen={() => handleDropDown("SettingsUser")}
                />
                <ToggleSwitch isToggled={isToggled} onToggle={handleSwitchMode} />
                <Notification className="size-4 transition-transform duration-100 hover:scale-110" />
                <Settings className="size-4 transition-transform duration-100 hover:scale-110" />
                <Profile height={23} fill="white" width={23} stroke="white" className="transition-transform duration-100 hover:scale-110" />
              </div>
              {isOpen("SettingsUser") && (
                <BannerItems
                  elements={ItemsSettingsUser}
                  onNavigate={handleItemClick}
                  myRef={settingsDropdownRef}
                  className="w-56"
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
