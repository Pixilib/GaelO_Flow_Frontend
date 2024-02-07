import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import { Banner } from "../RenderComponents/Banner/Banner";
import { BannerDropDown } from "../RenderComponents/Banner/BannerDropDown";
import Items from "../RenderComponents/NavBar/Items";
import ItemsProps from "../RenderComponents/NavBar/Items"
import { VariantItem } from '../RenderComponents/NavBar/ItemsVariant';

import ToogleChevron from "../RenderComponents/shared/ToogleChevron";

import Language from "../assets/language.svg?react";
import ChevronDown from "../assets/chevron-up.svg?react";

const RootApp = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
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
  const dropdownItems:ItemsProps = [
    { title: "English", path: "/english", isActive: true},
    { title: "Français", path: "/français", isActive: false},
  ];
  return (
    <div className="flex w-full h-full">
      <SideBar onLogout={handleLogout} className="fixed" />
      <div className="flex flex-col flex-1">
        <Banner title={"Home"}>
          <BannerDropDown>
            <div className="inline-flex items-center w-full">
              <Language />
              <span className="mx-4">English</span>
              <ToogleChevron
                name={"Language"}
                isOpen={openItem === "Language"}
                toggleOpen={() => toggleOpen("Language")}
              />
            </div>
            <div className="flex justify-center w-inherit">
              {isOpen("Language") && (
                <Items
                  // className={`w-full rounded-b-xl bg-primary text-white shadow-lg`}
                  variant={VariantItem["BannerItems"]}
                  items={dropdownItems}
                  onNavigate={onNavigate}
                />
              )}
            </div>
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
