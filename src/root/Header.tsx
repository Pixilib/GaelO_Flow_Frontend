import { TiUser } from "react-icons/ti"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { IoLanguage as LanguageIcon } from "react-icons/io5";
import { MdNotifications as NotificationsIcon, MdSettings as SettingsIcon } from "react-icons/md";
import Banner from "../ui/menu/Banner";
import BannerItems from "../ui/menu/BannerItems";
import DropDown from "../ui/menu/DropDown";
import ToggleSwitch from "../ui/menu/ToggleSwitch";
import { Item } from "../ui/menu/Items";

type HeaderProps = {
  title: string;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

const Header = ({ title, openItem, setOpenItem }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const handleDropDown = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };

  const handleSettingsItemClick = (item: Item) => {
    navigate(item.path);
  };

  const handleLeftIconClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const isOpen = (item: string): boolean => openItem === item;
  const leftIcon =
    location.pathname === "/" ? (
      <BsFillHouseDoorFill />
    ) : (
      <span>
        <AiOutlineArrowLeft />
      </span>
    );

  const ItemsLanguage = [
    {
      title: "English",
      code: "fr",
      path: "/english",
      isActive: location.pathname === "/english",
    },
    {
      title: "Français",
      code: "en",
      path: "/francais",
      isActive: location.pathname === "/francais",
    },
  ];

  const ItemsSettingsUser: Item[] = [
    {
      title: "Profile",
      path: "/profile",
      isActive: location.pathname === "/profile",
    },
    {
      title: "Settings",
      path: "/settings",
      isActive: location.pathname === "/settings",
    },
  ];

  return (
    <Banner
      title={title}
      leftIcon={leftIcon}
      onLeftIconClick={handleLeftIconClick}
      className="sticky top-0 bg-white"
    >
      <div className="flex justify-end gap-4">
        <DropDown
          chevronPosition="right"
          className="relative flex flex-col w-44"
          isOpen={isOpen("Language")}
          dropDownOpen={() => handleDropDown("Language")}
          dropDown={
            <div className="absolute -mt-2 top-full">
              <BannerItems
                elements={ItemsLanguage}
                onSelect={(item: any) => i18n.changeLanguage(item.code)}
                isOpen={isOpen("Language")}
                setOpenItem={() => setOpenItem(null)}
                className="w-40"
              />
            </div>
          }
        >
          <span className="inline-flex items-center">
            <LanguageIcon />
            <span className="mx-4">
              {ItemsLanguage.find((item) => item.code === i18n.language)?.title}
            </span>
          </span>
        </DropDown>
        <DropDown
          chevronPosition="left"
          className="relative flex flex-col w-60"
          isOpen={isOpen("SettingsUser")}
          dropDownOpen={() => handleDropDown("SettingsUser")}
          dropDown={
            <div className="absolute -mt-2 top-full ">
              <BannerItems
                elements={ItemsSettingsUser}
                onSelect={handleSettingsItemClick}
                className="w-56"
                isOpen={isOpen("SettingsUser")}
                setOpenItem={() => setOpenItem(null)}
              />
            </div>
          }
        >
        <ToggleSwitch
  isToggled={true} // or pass the state variable controlling the toggle
  onToggle={(isChecked) => {
    console.log("Toggle state:", isChecked);
    // Handle state change logic here
  }}
/>
          <NotificationsIcon className="transition-transform duration-100 size-4 hover:scale-110" />
          <SettingsIcon className="transition-transform duration-100 size-4 hover:scale-110" />
          <TiUser 
            size={23}
            className="transition-transform duration-100 hover:scale-110"
            fill="white"
            stroke="white"
          />
        </DropDown>
      </div>
    </Banner>
  );
};

export default Header;
