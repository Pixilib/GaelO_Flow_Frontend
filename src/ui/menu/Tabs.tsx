import React from 'react';

export type TabProps = {
  title: string;
  active: boolean;
  onClick: () => void
  variant?: 'basic' | 'underline' | 'pill';
};

const Tab: React.FC<TabProps> = ({ title, active, variant = 'basic', onClick }) => {
  const variantStyles = {
    basic: {
      active: ' first:rounded-tl-xl bg-success text-white rounded-t-xl',
      inactive: 'text-gray-400  bg-primary text-white first:rounded-tl-xl',
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
      <div
        data-gaelo-flow="Tab"
        className={`${active ?
          variantStyles[variant].active : variantStyles[variant].inactive}
       px-6 py-3 font-medium
       cursor-pointer text-lg 
       leading-normal`}
        onClick={() => onClick()}
      >
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
    <div
      data-gaelo-flow="Tabs"
      className={
        `flex flex-col ${className} 
      shadow-md first:rounded-tl-xl
      last:rounded-tr-xl bg-primary
      h-auto rounded-t-xl`
      }
      onClick={onClick}>
      <div className="flex">
        {children}
      </div>
    </div>
  );
};

export default Tabs;
export { Tab };
