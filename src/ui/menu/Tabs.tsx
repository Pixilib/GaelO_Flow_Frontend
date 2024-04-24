import React, { useState } from 'react';

export type TabProps = {
  title: string;
  path?: string;
  component: React.ComponentType<any> | React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ component }) => {
  return <>{typeof component === 'function' ? React.createElement(component) : component}</>;
};

export type TabsProps = {
  children: React.ReactElement<TabProps>[];
  variant?: 'basic' | 'underline' | 'pill';
  className?: string;
  onTabClick?: (path: string) => void;
};

const variantStyles = {
  basic: {
    active: 'z-50 first:rounded-tl-xl bg-light-gray text-[#929393] rounded-t-xl',
    inactive: 'text-gray-400 hover:text-[#929393] bg-primary text-white z-50 first:rounded-tl-xl',
  },
  underline: {
    active: 'border-b-2 border-primary text-primary',
    inactive: 'text-gray-500 hover:text-primary',
  },
  pill: {
    active: 'bg-primary text-white rounded-full',
    inactive: 'text-primary hover:bg-lightGray rounded-full',
  },
};

const Tabs: React.FC<TabsProps> = ({ children, variant = 'basic', onTabClick, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number, path?: string) => {
    setActiveTab(index);
    if (path && onTabClick) {
      onTabClick(path);
    }
  };

  const tabClass = (index: number):string => {
    const isActive = index === activeTab;
    return `${isActive ? variantStyles[variant].active : variantStyles[variant].inactive} px-6 py-3 font-medium cursor-pointer text-lg leading-normal`;
  };

  return (
    <div className={`flex flex-col ${className} shadow-md first:rounded-tl-xl last:rounded-tr-xl bg-primary h-auto`}>
      <div className="flex">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={tabClass(index)}
            onClick={() => handleClick(index, child.props.path)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className="flex-grow bg-light-gray">
        {React.isValidElement(children[activeTab]) ? <Tab {...children[activeTab].props} /> : null}
      </div>
    </div>
  );
};

export default Tabs;
export { Tab };
