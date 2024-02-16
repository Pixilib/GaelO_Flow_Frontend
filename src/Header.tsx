import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useOutsideClick from "./utils/useOutsideClick";
import { Banner } from "./Banner";
import BannerItems from "./BannerItems";
import { BannerDropDown } from "./RenderComponents/Banner/BannerDropDown";
import { Item } from "./RenderComponents/Items/Items";
import ToggleSwitch from "./RenderComponents/ToggleSwitch";
import ToogleChevron from "./RenderComponents/ToogleChevron";

import Language from "../assets/language.svg?react";
import Notification from "../assets/notification.svg?react";
import Settings from "../assets/settings.svg?react";
import Profile from "../assets/user-banner.svg?react";

type HeaderProps = {
    openItem: string | null;
    setOpenItem: (value: string | null) => void;
    isToggled: boolean;
    setIsToggled: (value: boolean) => void;
};


const Header = ({ openItem, setOpenItem, isToggled, setIsToggled}: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const languageDropdownRef = useRef<HTMLUListElement>(null);
    const settingsDropdownRef = useRef<HTMLUListElement>(null);
    useOutsideClick(languageDropdownRef, () => isOpen('Language') && handleDropDown('Language'));
    useOutsideClick(settingsDropdownRef, () => isOpen('SettingsUser') && handleDropDown('SettingsUser'));
    
    const handleDropDown = (name: string) => {
        setOpenItem(openItem === name ? null : name);
    };
    const handleItemClick = (path: string) => {
        navigate(path);
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

    )

}

export default Header;