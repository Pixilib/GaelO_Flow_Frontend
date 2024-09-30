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
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'; // Ajout de mb pour l'espace
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'; // Ajout de ml pour l'espace
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'; // Ajout de mt pour l'espace
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'; // Ajout de mr pour l'espace
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    }
  };

  const handleEvent = withOnClick
    ? { onClick: () => setIsOpen(!isOpen) }
    : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  return (
    <div className="relative" data-gaelo-flow="Popover">
      <span {...handleEvent}>
        {children}
      </span>
      {isOpen && (
        <div
          className={`absolute ${getPlacementClasses(placement)} z-50 rounded-lg bg-white p-4 text-gray-600 shadow-md dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
          {popover}
        </div>
      )}
    </div>
  );
};

export default Popover;
