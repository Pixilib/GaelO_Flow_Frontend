import React, { useState, useRef, ReactNode } from 'react';

type PopoverProps = {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-end';
};

const Popover: React.FC<PopoverProps> = ({ trigger, content, className, placement = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const placementClasses = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-4",
    left: "right-full mr-2",
    'bottom-end': "left-full ml-2",
  };

  return (
    <div className={`relative ${className}`} ref={popoverRef} onMouseLeave={handleMouseLeave}>
      <div onMouseEnter={handleMouseEnter} className="flex items-center text-sm text-gray-500 cursor-pointer dark:text-gray-400">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 ${placementClasses[placement]} bg-white border border-gray-200 rounded-lg shadow-md p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400 w-72 transition-opacity duration-300 opacity-100`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
