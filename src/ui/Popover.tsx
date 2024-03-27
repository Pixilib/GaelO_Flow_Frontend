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
  className,
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

  const handleEvent = withOnClick ? { onClick: () => setIsOpen(!isOpen) } : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  return (
    <div className="fixed" onMouseLeave={() => setIsOpen(false)}>
      <div {...handleEvent} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          className={`z-10 ${getPlacementClasses(placement)} w-80 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
          {popover}
        </div>
      )}
    </div>
  );
};

export default Popover;
