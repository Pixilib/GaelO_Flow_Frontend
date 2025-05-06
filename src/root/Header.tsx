import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import Banner from '../ui/menu/Banner';
import ToggleDarkMode from './ToggleDarkMode';
import BannerItems from '../ui/menu/BannerItems';
import ToolList from './ToolList';
import { Language, Notification, User } from '../icons';
import { Dropdown, Popover, ToogleChevron } from '../ui';
import Jobs from './notifications/Jobs';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

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
  const { i18n } = useTranslation();

  const jobs = useSelector((state: RootState) => state.job.jobs);

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

  const languageItems: Item[] = [
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
        <ToolList />
        <Dropdown
          ref={dropdownRef}
          className="flex flex-col"
          isOpen={openItem === 'Dropdown'}
          dropDown={
            <div className={`absolute -mt-2 top-full w-80 shadow-lg rounded-lg transition-all duration-200 ${openItem === 'Dropdown' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <BannerItems
                elements={languageItems}
                onSelect={(item) => handleItemClick(item)}
                isOpen={openItem === 'Dropdown'}
                setOpenItem={setOpenItem}
                className="w-80"
              />
            </div>
          }
        >
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleDropdown}>
            <Language className="w-5 h-5 mx-1" fill="currentColor" />
            <span className="text-sm">
              {languageItems.find((item) => item.code === i18n.language)?.title}
            </span>
            <ToogleChevron isOpen={openItem === 'Dropdown'} />
            <ToggleDarkMode />
          </div>
        </Dropdown>

        <div className="flex items-center bg-primary rounded-xl text-white p-3 gap-3">
          <Popover
            className='border border-gray-custom max-h-150 overflow-auto translate-y-3 -translate-x-60'
            withOnClick
            backgroundColor='bg-white'
            popover={
              <Jobs />
            }
          >
            <span className='relative'>
              <Notification className="w-5 h-5 transition-transform duration-100 hover:scale-110 cursor-pointer" fill="currentColor" />
              {jobs.length > 0 ?
                (<span className='absolute -bottom-4 -right-2 bg-danger pr-1 pl-1 rounded-xl text-xs'>
                  {jobs.length}
                </span>)
                :
                null
              }
            </span>
          </Popover>
          <Popover
            className='border border-gray-custom dark:border-gray-600 translate-y-3 -translate-x-83'
            withOnClick
            backgroundColor='bg-white dark:bg-gray-800'
            popover={
              <UserProfile />
            }
          >
            <User className="w-5 h-5 transition-transform duration-100 hover:scale-110 cursor-pointer" fill="currentColor" />
          </Popover>
        </div>
      </div>
    </Banner>
  );
};

export default Header;
