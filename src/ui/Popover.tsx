import React, { useState } from 'react';

type PopoverProps = {
  children: React.ReactNode;
  popover: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

const Popover: React.FC<PopoverProps> = ({
  children,
  popover,
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

  return (
    <div className="relative" >
      <span onClick={() => setIsOpen(!isOpen)}>
        {children}
      </span>
      <div className="cursor-pointer" >
        {isOpen && (
          <div
            className={` ${getPlacementClasses(placement)} rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
          >
            {popover}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;
