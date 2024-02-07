import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import { Banner } from "../RenderComponents/Banner/Banner";
import { BannerDropDown } from '../RenderComponents/Banner/BannerDropDown';
import Items from "../RenderComponents/NavBar/Items";
import ItemsProps from "../RenderComponents/NavBar/Items"
import { VariantItem } from '../RenderComponents/NavBar/ItemsVariant';

import ToogleChevron from "../RenderComponents/shared/ToogleChevron";

import Language from "../assets/language.svg?react";
import ChevronDown from "../assets/chevron-up.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";

const RootApp = () => {
  const [openItem, setOpenItem] = useState<string|null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = (path: string, language: string) => {
    navigate(path);
    setSelectedLanguage(language);
    setOpenItem(null); 
  };

  const toggleOpen = (name: string) => {
    console.log("toggleOpen")
    console.log({name,openItem,isOpen : openItem === name})
    setOpenItem(openItem === name ? null : name);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const isOpen = (item: string): boolean => openItem === item;
  const ItemsLanguage:Items[] = [
    { title: "English", path: "/english", isActive: location.pathname === "/english"},
    { title: "Français", path: "/francais", isActive: location.pathname === "/francais"},
  ];

  const ItemsSettingsUser:Items[] = [
    { title: "Profile", path: "/profile", isActive: location.pathname === "/profile"},
    { title: "Settings", path: "/settings", isActive: location.pathname === "/settings"},
  ];
  console.log({name,openItem,isOPen : openItem === name})

  // console.log({location,selectedLanguage,openItem, isOpen: isOpen("Language"),name})
  return (
    <div className="flex w-full h-full">
      <SideBar onLogout={handleLogout} className="fixed" />
      <div className="flex flex-col flex-1">
        <Banner title={"Home"}>
          <BannerDropDown>
            <div className="inline-flex items-center w-full">
              <Language />
              <span className="mx-4">{selectedLanguage}</span>
              <ToogleChevron
                name={"Language"}
                isOpen={isOpen("Language")}
                toggleOpen={() => toggleOpen("Language")}
              />
            </div>
              {isOpen("Language") && (
                <Items
                  // className={`w-full rounded-b-xl bg-primary text-white shadow-lg`}
                  variant={VariantItem["BannerItems"]}
                  items={ItemsLanguage}
                  onNavigate={onNavigate}
                />
              )}
          </BannerDropDown>
          <BannerDropDown>
          <div className="inline-flex items-center w-full">
          <ToogleChevron
                name={"SettingsUser"}
                isOpen={isOpen("SettingsUser")}
                toggleOpen={() => toggleOpen("SettingsUser")}
              />
              {openItem}
            <Notification />
            <Settings />
          </div>
          {isOpen("SettingsUser") && (
            <Items
              variant={VariantItem["BannerItems"]}
              items={ItemsSettingsUser}
              onNavigate={onNavigate}
            />
          )}
          </BannerDropDown>
        </Banner>

        <div className="flex h-full">
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
