import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { IoLanguage as LanguageIcon } from 'react-icons/io5';
import { MdNotifications as NotificationsIcon, MdSettings as SettingsIcon } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';
import Banner from '../ui/menu/Banner';
import DropDown from '../ui/menu/DropDown';
import ToggleSwitch from '../ui/menu/ToggleSwitch';
import BannerItems from '../ui/menu/BannerItems';

type Item = {
  title: string;
  path: string;
  isActive: boolean;
};

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  
  const [openItem, setOpenItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenItem(null); // Close dropdown if clicked outside
      }
    };

    if (openItem) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openItem]);

  const handleDropDown = (name: string) => {
    setOpenItem(prev => (prev === name ? null : name));
  };

  const handleSettingsItemClick = (item: Item) => {
    navigate(item.path);
    setOpenItem(null); // Close dropdown after navigation
  };

  const handleLeftIconClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const isOpen = (item: string): boolean => openItem === item;
  const leftIcon = location.pathname === '/' ? <BsFillHouseDoorFill /> : <AiOutlineArrowLeft />;

  const ItemsLanguage = [
    {
      title: 'English',
      code: 'en',
      path: '/english',
      isActive: location.pathname === '/english',
    },
    {
      title: 'Français',
      code: 'fr',
      path: '/francais',
      isActive: location.pathname === '/francais',
    },
  ];

  const ItemsSettingsUser: Item[] = [
    {
      title: 'Profile',
      path: '/profile',
      isActive: location.pathname === '/profile',
    },
    {
      title: 'Settings',
      path: '/settings',
      isActive: location.pathname === '/settings',
    },
  ];

  return (
    <Banner
      title={title}
      leftIcon={leftIcon}
      onLeftIconClick={handleLeftIconClick}
      className="sticky top-0 z-50 bg-white"
    >
      <div className="flex justify-end gap-4">
        <DropDown
          ref={dropdownRef}
          chevronPosition="right"
          className="relative flex flex-col w-44"
          isOpen={isOpen('Language')}
          dropDownOpen={() => handleDropDown('Language')}
          dropDown={
            <div className="absolute -mt-2 top-full">
              <BannerItems
                elements={ItemsLanguage}
                onSelect={(item) => {
                  i18n.changeLanguage(item.code);
                  setOpenItem(null);
                }}
                isOpen={isOpen('Language')}
                className="w-40"
              />
            </div>
          }
        >
          <span className="inline-flex items-center" onClick={() => handleDropDown('Language')}>
            <LanguageIcon />
            <span className="mx-4">
              {ItemsLanguage.find((item) => item.code === i18n.language)?.title}
            </span>
          </span>
        </DropDown>
        <DropDown
          ref={dropdownRef}
          chevronPosition="left"
          className="relative flex flex-col w-60"
          isOpen={isOpen('SettingsUser')}
          dropDownOpen={() => handleDropDown('SettingsUser')}
          dropDown={
            <div className="absolute -mt-2 top-full">
              <BannerItems
                elements={ItemsSettingsUser}
                onSelect={(item) => {
                  handleSettingsItemClick(item);
                }}
                isOpen={isOpen('SettingsUser')}
                setOpenItem={() => setOpenItem(null)}
                className="w-56"
              />
            </div>
          }
        >
          <ToggleSwitch
            isToggled={true} // Replace with actual state variable controlling the toggle
            onToggle={(isChecked) => {
              console.log('Toggle state:', isChecked);
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
