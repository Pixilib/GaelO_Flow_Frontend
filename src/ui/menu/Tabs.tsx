import { useState } from 'react';

// Définition du type pour chaque onglet
export type Tab = {
  title: string;
  path?: string;
  Component: () => React.ReactNode|string;
};

// Props du composant Tabs
export type TabsProps = {
  tabs: Tab[];
  variant?: 'basic' | 'underline' | 'pill' | 'boxed';
  onTabClick?: (path: string) => void; 
};

// Styles pour chaque variant
const variantStyles = {
  basic: {
    active: 'bg-white text-dark rounded-t-xl hover:bg-white hover:text-dark',
    inactive: 'bg-primary text-white hover:bg-white hover:text-dark',
  },
  underline: {
    active: 'border-b-2 border-primary text-primary hover:border-b-2 hover:border-primary hover:text-dark',
    inactive: 'text-gray-500 hover:text-primary hover:text-dark',
  },
  pill: {
    active: 'bg-primary text-white rounded-full hover:bg-primary hover:text-dark',
    inactive: 'text-primary hover:bg-primary hover:text-dark rounded-full',
  },
  boxed: {
    active: 'bg-primary text-white border border-primary rounded hover:bg-primary hover:text-dark',
    inactive: 'text-primary border border-gray-300 hover:bg-primary hover:text-dark rounded',
  },
};

const Tabs = ({ tabs, variant = 'basic', onTabClick }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  console.log('activeTab', activeTab);
  const styles = variantStyles[variant];

  const handleClick = (index: number) => {
    setActiveTab(index);
    const path = tabs[index].path;
    
    if( path && onTabClick) onTabClick(path);
  };
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-center text-center cursor-pointer rounded-t-xl min-w-30 min-h-20">
        {tabs.map((tab,index) => (
          <div
            key={index}
            className={`flex-grow min-h-20 rounded-t-xl flex items-center justify-center ${activeTab === index ? styles.active : styles.inactive}`}
            onClick={() => handleClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {tabs[activeTab]?.Component()}
    </div>
  );
};

export default Tabs;
