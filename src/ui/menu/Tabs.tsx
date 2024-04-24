import React from 'react';

export type TabProps = {
  title: string;
  active: boolean;
  onClick : () => void
  variant?: 'basic' | 'underline' | 'pill';
 };

const Tab: React.FC<TabProps> = ({ title, active, variant = 'basic', onClick}) => {
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

  return (
  <>
    <div className={`${active ? variantStyles[variant].active : variantStyles[variant].inactive} px-6 py-3 font-medium cursor-pointer text-lg leading-normal`} onClick={() => onClick()}>
      {title}
    </div>
</>
);
};

export type TabsProps = {
  children: React.ReactElement<TabProps>[];
  className?: string;
  onClick?: () => void;
};

const Tabs: React.FC<TabsProps> = ({ children, onClick, className }) => {
  
  return (
    <div className={`flex flex-col ${className} shadow-md first:rounded-tl-xl last:rounded-tr-xl bg-primary h-auto`} onClick={onClick}>
      <div className="flex">
        {children}
      </div>
    </div>
  );
};

export default Tabs;
export { Tab };
