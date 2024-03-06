import React, { useState } from 'react';

type SimplePopoverProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

const SimplePopover: React.FC<SimplePopoverProps> = ({
  trigger,
  content,
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
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 ${getPlacementClasses(placement)} bg-white rounded-lg shadow-md p-4 text-gray-600 dark:bg-gray-800 dark:text-gray-400`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default SimplePopover;
