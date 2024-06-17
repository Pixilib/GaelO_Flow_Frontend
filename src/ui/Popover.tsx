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
  withOnClick = false,
  placement = 'bottom',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlacementClasses = (placement: string) => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-2';
      case 'right':
        return 'left-full ml-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      default:
        return 'top-full mt-2';
    }
  };

  const handleEvent = withOnClick
    ? { onClick: () => setIsOpen(!isOpen) }
    : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  return (
    <div
      {...handleEvent}
      className="relative inline-block"
      data-gaelo-flow="Popover"
    >
      {children}
      {isOpen && (
        <div
          className={`absolute ${getPlacementClasses(placement)} z-50 w-80 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
          {popover}
        </div>
      )}

    </div>
  );
};

export default Popover;
