import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate } from "react-router-dom";

import { SideBar } from "../layout/SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import Header from "../layout/Header";
import { useTranslation } from "react-i18next";

type RootAppProps = {
  language: string;
  setLanguageSelect: (lang: string) => void;
};
const RootApp = ({ language, setLanguageSelect }: RootAppProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [bannerTitle, setBannerTitle] = useState<string>('Home');

  const handleTitle = (title: string) => {
    const newTitle = t(title, { defaultValue: title })
    console.log({ newTitle, title });
    setBannerTitle(newTitle);
  };
  const handleSwitchMode = () => {
    setIsToggled(!isToggled);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLanguage = (lang: string) => {
    setLanguageSelect(lang);
  }


  console.log({ language })
  return (
    <div className="flex size-full">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} setBannerTitle={handleTitle} />
      <div className="flex flex-1 flex-col">
        <Header
          title={bannerTitle}
          setBannerTitle={handleTitle}
          openItem={openItem}
          setOpenItem={setOpenItem}
          isToggled={isToggled}
          onSwicthMode={handleSwitchMode}
          language={language}
          setLanguageSelect={handleLanguage}
        />

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
