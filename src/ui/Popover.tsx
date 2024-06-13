import React, { useState } from 'react';

type PopoverProps = {
  children: React.ReactNode;
  popover: React.ReactNode;
  withOnClick?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

const Popover: React.FC<PopoverProps> = ({
  children,
  popover,
  withOnClick = "false",
  placement = 'bottom',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlacementClasses = (placement: string) => {
    switch (placement) {
      case 'top':
        return 'z-100 absolute bottom-full';
      case 'right':
        return 'z-100 absolute left-full';
      case 'bottom':
        return 'z-100 absolute top-full';
      case 'left':
        return 'z-100 absolute right-full';
      default:
        return 'z-100 absolute top-full';
    }
  };

  const handleEvent = withOnClick ? { onClick: () => setIsOpen(!isOpen) } : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  return (
    <div {...handleEvent} className="relative" >
      {children}
      <div className="z-50 cursor-pointer " >
        {isOpen && (
          <div
            className={` ${getPlacementClasses(placement)} z-100 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
          >
            {popover}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;
