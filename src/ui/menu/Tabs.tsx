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
  variant?: 'basic' | 'underline' | 'pill' ;
  className?: string;
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
};

const Tabs = ({ tabs, variant = 'basic', onTabClick, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const styles = variantStyles[variant];

  const handleClick = (index: number) => {
    setActiveTab(index);
    const path = tabs[index].path;
    if( path && onTabClick) onTabClick(path);
  };
  
  return (
    <div data-gaelo-flow="Tabs" className={`flex flex-col shadow-lg justify-center w-full h-full rounded-lg ${className}`}>
      <div className="flex items-center justify-center text-center shadow-md cursor-pointer rounded-t-xl min-w-30 min-h-20">
        {tabs.map((tab,index) => (
          <div
            data-galeo-flow={`Tab-${tab.title}`}
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
