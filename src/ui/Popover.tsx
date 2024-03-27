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
        return 'absolute bottom-full';
      case 'right':
        return 'absolute left-full';
      case 'bottom':
        return 'absolute top-full';
      case 'left':
        return 'absolute right-full';
      default:
        return 'absolute top-full';
    }
  };

  const handleEvent = withOnClick ? { onClick: () => setIsOpen(!isOpen) } : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  console.log({ isOpen })
  return (
    <div {...handleEvent} >
      {children}
      <div className="cursor-pointer  z-100" >
        {isOpen && (
          <div
            className={` ${getPlacementClasses(placement)} absolute z-100 w-80 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
          >
            {popover}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;
