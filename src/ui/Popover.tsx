import React, { useState } from 'react';

type PopoverProps = {
  children: React.ReactNode;
  withOnClick: boolean;
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
        return 'bottom-full';
      case 'right':
        return 'left-full';
      case 'bottom':
        return 'top-full';
      case 'left':
        return 'right-full';
      default:
        return 'top-full';
    }
  };

  const handleEvent = withOnClick
    ? { onClick: () => setIsOpen(!isOpen) }
    : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  return (
    <div
      className="relative"
      data-gaelo-flow="Popover"
    >
      <span  {...handleEvent}>
        {children}
      </span>
      {isOpen && (
        <div

          className={`absolute m-2 ${getPlacementClasses(placement)} z-10 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
          {popover}
        </div>
      )}

    </div>
  );
};

export default Popover;
