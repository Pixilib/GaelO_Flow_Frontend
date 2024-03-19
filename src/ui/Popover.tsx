import React, { useState } from 'react';

type PopoverProps = {
  children: React.ReactNode;
  popover: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

const Popover: React.FC<PopoverProps> = ({
  children,
  popover,
  placement = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlacementClasses = (placement: string) => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-1'; 
      case 'right':
        return 'left-full ml-1'; 
      case 'bottom':
        return 'top-full mt-1'; 
      case 'left':
        return 'right-full mr-1'; 
      default:
        return 'top-full mt-1'; 
    }
  };
  

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <div onMouseEnter={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
        className={`absolute z-10 ${getPlacementClasses(placement)} bg-white rounded-lg shadow-md p-4 text-gray-600 dark:bg-gray-800 dark:text-gray-400 w-80`} 
        >
          {popover}
        </div>
      )}
    </div>
  );
};

export default Popover;