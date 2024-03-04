import React, { useState, useRef, useEffect } from 'react';

type PopoverProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

const Popover = ({ trigger, content, className, placement = 'bottom' }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverRef]);

  const handleClick = () => {
    console.log('handleClick');
    setIsOpen(!isOpen);
  };

  const placementClasses = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
  };

  return (
    <div className={`relative ${className}`} ref={popoverRef}>
      <div onClick={handleClick} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 ${placementClasses[placement]} bg-white border border-gray-200 rounded-lg shadow-md p-4 text-sm text-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
