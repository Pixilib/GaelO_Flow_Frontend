import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Banner from '../ui/menu/Banner';
import ToggleSwitch from '../ui/menu/ToggleSwitch';
import BannerItems from '../ui/menu/BannerItems';
import DeleteList from './ToolList';
import { Gear, Language, Notification, User } from '../icons';
import { Dropdown, ToogleChevron } from '../ui';

type Item = {
  title: string;
  path?: string;
  code?: string;
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
        setOpenItem(null);
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

  const handleDropdown = () => {
    setOpenItem(prev => (prev ? null : 'Dropdown'));
  };

  const handleItemClick = (item: Item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.code) {
      i18n.changeLanguage(item.code);
    }
    setOpenItem(null);
  };

  const Items: Item[] = [
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
    {
      title: 'English',
      code: 'en',
      isActive: i18n.language === 'en',
    },
    {
      title: 'Français',
      code: 'fr',
      isActive: i18n.language === 'fr',
    },
  ];

  return (
    <Banner
      title={title}
      onLeftIconClick={() => navigate('/')}
      className="sticky top-0 z-50 bg-white"
    >
      <div className="flex justify-end gap-4">
        <DeleteList />
        <div className="relative">
          <Dropdown
            ref={dropdownRef}
            className="flex flex-col"
            isOpen={openItem === 'Dropdown'}
            dropDownOpen={handleDropdown}
            dropDown={
              <div className={`absolute -mt-2 top-full w-80 bg-white shadow-lg rounded-lg transition-all duration-200 ${openItem === 'Dropdown' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <BannerItems
                  elements={Items}
                  onSelect={(item) => handleItemClick(item)}
                  isOpen={openItem === 'Dropdown'}
                  setOpenItem={setOpenItem}
                  className="w-80"
                />
              </div>
            }
          >
            <ToggleSwitch
              isToggled={true}
              onToggle={(isChecked) => {
                console.log('Toggle state:', isChecked);
              }}
            />
            <div className="relative flex items-center gap-2">
              <Language className="w-5 h-5 mx-1" fill="currentColor" />
              <span className="text-sm">
                {Items.find((item) => item.code === i18n.language)?.title}
              </span>
              <ToogleChevron
                isOpen={openItem === 'Dropdown'}
                className="ml-1 cursor-pointer"
                onClick={handleDropdown}
              />
              <Notification className="w-5 h-5 transition-transform duration-100 hover:scale-110" fill="currentColor" />
              <Gear className="w-5 h-5 transition-transform duration-100 hover:scale-110" fill="currentColor" />
              <User className="w-5 h-5 transition-transform duration-100 hover:scale-110" fill="currentColor" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Banner>
  );
};

export default Header;
