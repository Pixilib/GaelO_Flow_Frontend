import React, { useState, ReactNode } from 'react';

// Définition du type pour chaque onglet
export type TabProps = {
  title: string;
  path?: string;
  component: React.ComponentType<any> | ReactNode;
};

// Composant Tab, il ne s'occupe que de l'affichage
const Tab: React.FC<TabProps> = ({ component }) => {
    return <>{typeof component === 'function' ? React.createElement(component) : component}</>;
};

// Props du composant Tabs
export type TabsProps = {
  children: React.ReactElement<TabProps>[];
  variant?: 'basic' | 'underline' | 'pill';
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

const Tabs: React.FC<TabsProps> = ({ children, variant = 'basic', onTabClick, className }) => {
  const [activeTab, setActiveTab] = useState(0);
  const styles = variantStyles[variant];

  const handleClick = (index: number, path?: string) => {
    setActiveTab(index);
    if (path && onTabClick) {
      onTabClick(path);
    }
  };

  return (
    <div className={`flex flex-col shadow-lg justify-center w-full h-full rounded-lg ${className}`}>
      <div className="flex items-center justify-center text-center shadow-md cursor-pointer rounded-t-xl min-w-30 min-h-20">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`flex-grow min-h-20 rounded-t-xl text-lg flex items-center justify-center ${index === activeTab ? styles.active : styles.inactive}`}
            onClick={() => handleClick(index, child.props.path)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      {React.isValidElement(children[activeTab]) ? <Tab {...children[activeTab].props} /> : null}
    </div>
  );
};

export default Tabs;
export { Tab };
