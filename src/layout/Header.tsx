import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


import { Banner } from "../RenderComponents/Menu/Banner";
import BannerItems from "../RenderComponents/Menu/BannerItems";
import { BannerDropDown } from "../RenderComponents/Menu/BannerDropDown";
import { Item } from "../RenderComponents/Menu/Items";
import ToggleSwitch from "../RenderComponents/Menu/ToggleSwitch";
import ToogleChevron from "../RenderComponents/Menu/ToogleChevron";

import ArrowBack from "../assets/arrow-back.svg?react";
import BannerHome from "../assets/banner-home.svg?react";
import Language from "../assets/language.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";
import Profile from "../assets/user-banner.svg?react";

type HeaderProps = {
    openItem: string | null;
    setOpenItem: (value: string | null) => void;
    isToggled: boolean;
    onSwicthMode: () => void;
};

const Header = ({ openItem, setOpenItem, isToggled, onSwicthMode }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

    const handleDropDown = (name: string) => {
        setOpenItem(openItem === name ? null : name);
    };
    const handleItemClick = (language: string) => {
        setSelectedLanguage(language);
        const lg = language === "English" ? "en" : "fr";
        i18n.changeLanguage(lg);
        handleDropDown('Language');
    };
    const handleSettingsItemClick = (path: string) => {
        navigate(path);
    };
    const handleLeftIconClick = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }
    };
    const isOpen = (item: string): boolean => openItem === item;
    const leftIcon = location.pathname === "/" ? <BannerHome /> : <span><ArrowBack /></span>;

    //Items for elements in props of BannerItems
    const ItemsLanguage: Item[] = [
        { title: "English", path: "/english", isActive: location.pathname === "/english" },
        { title: "Français", path: "/francais", isActive: location.pathname === "/francais" },
    ];
    const ItemsSettingsUser: Item[] = [
        { title: "Profile", path: "/profile", isActive: location.pathname === "/profile" },
        { title: "Settings", path: "/settings", isActive: location.pathname === "/settings" },
    ];
    const title = t('titleBanner');
    return (
        <Banner title={title} leftIcon={leftIcon} onLeftIconClick={handleLeftIconClick} >
            <div className="flex justify-end ">
                <BannerDropDown className="flex w-44 flex-col" isOpen={isOpen("Language")} dropDownOpen={()=>handleDropDown("Language")}>
                    <div className="inline-flex w-full items-center">
                        <Language />
                        <span className="mx-4">{selectedLanguage}</span>
                        <ToogleChevron
                            isOpen={isOpen("Language")}
                            onClick={() => handleDropDown("Language")}
                        />
                    </div>
                    <BannerItems
                        elements={ItemsLanguage}
                        onNavigate={(path) => {
                            const language = path === "/english" ? "English" : "Français";
                            handleItemClick(language);
                        }}
                        isOpen={isOpen("Language")}
                        setOpenItem={() => setOpenItem(null)}
                        className="w-40"
                    />
                </BannerDropDown>
                <BannerDropDown className="flex w-60 flex-col" isOpen={isOpen("SettingsUser")} dropDownOpen={()=>handleDropDown("SettingsUser")}>
                        <div className="inline-flex w-full items-center gap-4">
                            <ToogleChevron
                                isOpen={isOpen("SettingsUser")}
                                onClick={() => handleDropDown("SettingsUser")}
                            />
                            <ToggleSwitch isToggled={isToggled} onToggle={onSwicthMode} />
                            <Notification className="size-4 transition-transform duration-100 hover:scale-110" />
                            <Settings className="size-4 transition-transform duration-100 hover:scale-110" />
                            <Profile height={23} fill="white" width={23} stroke="white" className="transition-transform duration-100 hover:scale-110" />
                        </div>
                        <BannerItems
                            elements={ItemsSettingsUser}
                            onNavigate={handleSettingsItemClick}
                            className="w-56"
                            isOpen={isOpen("SettingsUser")}
                            setOpenItem={() => setOpenItem(null)}
                        />
                </BannerDropDown>
            </div>
        </Banner>
    )
}

export default Header;